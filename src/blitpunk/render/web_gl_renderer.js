import { Viewport, ShaderContext } from 'blitpunk/core'
import ClearBuffer from './clear_buffer'
import destroy from 'blitpunk/utils/destroy'

const autotouchBuffer = (renderer, resourceRef) => {
  const { resource } = resourceRef
  if (resource.enableAutotouch) {
    if (!renderer.autotouchResources.has(resourceRef.id)) {
      renderer.autotouchResources.set(resourceRef.id, true)
      resource.touch()
    }
  }
}

const applyBlendMode = (renderer) => {
  const blendMode = renderer.blendStack[renderer.blendStack.length - 1] || renderer.initialBlendMode
  if (blendMode && !blendMode.isEqual(renderer.currentBlendMode)) {
    renderer.glx.blend(blendMode)
    renderer.currentBlendMode = blendMode
  }
}

export default class WebGlRenderer {
  constructor (glx) {
    Object.defineProperty(this, 'glx', { value: glx })

    this.shaderContext = new ShaderContext()
    this.autotouchResources = new Map()
    this.clearBuffer = new ClearBuffer(this.glx)
    this.blendStack = []
    this.initialBlendMode = null
    this.currentBlendMode = null
    this.viewport = null
  }

  destroy () {
    this.shaderContext.destroy()
    this.autotouchResources.clear()
    this.blendStack.length = 0
    destroy(this)
  }

  setViewport (x, y, width, height) {
    let { viewport } = this
    if (!viewport) {
      this.viewport = new Viewport()
      viewport = this.viewport
    }
    viewport.x = x
    viewport.y = y
    viewport.width = width
    viewport.height = height
  }

  /**
   * Set the initial blend mode.
   *
   * @param {BlendMode} blendMode
   */
  setInitialBlendMode (blendMode) {
    this.initialBlendMode = blendMode
  }

  renderFrame (renderCallback) {
    this.beginRenderFrame()
    renderCallback()
    this.endRenderFrame()
  }

  beginRenderFrame () {
    this.shaderContext.clear()
    this.clearBuffer.reset()
    this.setGlViewport(this.viewport)
  }

  endRenderFrame () {
    this.autotouchResources.clear()
  }

  setGlViewport (viewport) {
    const { gl } = this.glx
    if (viewport) {
      gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height)
    } else {
      gl.viewport(0, 0)
    }
  }

  /**
   * Push a new blend mode to the stack.
   *
   * @param {BlendMode} blendMode
   */
  pushBlendMode (blendMode) {
    this.blendStack.push(blendMode)
  }

  /**
   * Remove the current blend mode from internal stack.
   * The initial blend mode can't be removed.
   */
  popBlendMode () {
    this.blendStack.pop()
  }

  /**
   * @param {ShaderProgram} shaderProgram
   */
  useShaderProgram (shaderProgram) {
    const program = this.glx.resourceLibrary.loadProgram(shaderProgram)
    const { shaderContext } = this
    program.use(shaderContext)
    program.loadUniforms(shaderContext, this)
    program.loadAttributes(shaderContext, this)
  }

  /**
   * @param {string} primitive
   * @param {number} count
   * @param {number} [startIndex=0]
   */
  drawArrays (primitive, count, startIndex = 0) {
    applyBlendMode(this)

    const { gl } = this.glx
    gl.drawArrays(gl[primitive], startIndex, count)
  }

  /**
   * @param {string} primitive
   * @param {ElementIndexArray} elementIndexArray
   * @param {number} [count]
   * @param {number} [offset=0]
   */
  drawIndexed (primitive, elementIndexArray, count, offset = 0) {
    applyBlendMode(this)
    this.syncBuffer(elementIndexArray).bindBuffer()

    const { gl } = this.glx
    gl.drawElements(
      gl[primitive],
      count || elementIndexArray.length,
      gl.UNSIGNED_SHORT,
      offset * elementIndexArray.array.BYTES_PER_ELEMENT)
  }

  /**
   * @param {VOArray|ElementIndexArray} resource
   * @return {WebGlBuffer}
   */
  syncBuffer (resource) {
    const { resourceRef } = resource
    autotouchBuffer(this, resourceRef)

    const bufferRef = this.glx.resourceLibrary.loadBuffer(resourceRef)
    bufferRef.sync(resourceRef, buffer => buffer.bufferData(resourceRef.hints.typedArray))
    return bufferRef.resource
  }

  /**
   * @param {Texture} texture
   * @return {WebGlTexture}
   */
  syncTexture (texture) {
    const texRef = texture.resourceRef
    const glTexRef = this.glx.resourceLibrary.loadTexture(texRef)
    glTexRef.sync(texRef, tex => tex.uploadImageData())
    return glTexRef.resource
  }
}

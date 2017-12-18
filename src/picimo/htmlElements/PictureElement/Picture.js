import { info } from 'common/log'

import { ATTR_VIEW_FIT } from '../constants'

import createVertices from './createVertices'
import updateViewFit from './updateViewFit'
import updateTexCoords from './updateTexCoords'

import { TEXTURE_SHADER_KEY } from './constants'

export default class {
  constructor (el) {
    this.el = el
  }

  initialize ({ spriteGroup, textureId, texture }) {
    const { el } = this
    const { meshRows, meshCols, sprites } = el

    info(`[picture] create mesh(${el.meshCols}x${el.meshRows}), textureId=${textureId}, spriteGroup=`, spriteGroup, el)

    spriteGroup.voPool.alloc(meshCols * meshRows, sprites)
    createVertices(el, 1.0, 1.0)
    el.transformUniform.value = [0, 0, 0]

    this.textureIdChanged(textureId)
    updateTexCoords(el, texture)
  }

  textureIdChanged (textureId) {
    this.el.spriteGroup.setTexture(TEXTURE_SHADER_KEY, textureId)
  }

  textureChanged (texture) {
    updateTexCoords(this.el, texture)
  }

  renderFrame (renderer) {
    const { el } = this

    if (el.hasAttribute(ATTR_VIEW_FIT)) {
      // TODO default value for view fit
      updateViewFit(el, renderer)
    }

    if (el.verticesUpdated) {
      el.spriteGroup.touchVertexBuffers()
      el.verticesUpdated = false
    }

    const { scaleUniform, transformUniform } = el
    const { shaderContext } = renderer

    shaderContext.pushVar(scaleUniform)
    shaderContext.pushVar(transformUniform)
  }

  postRenderFrame (renderer) {
    const { el } = this
    const { scaleUniform, transformUniform } = el
    const { shaderContext } = renderer

    shaderContext.popVar(scaleUniform)
    shaderContext.popVar(transformUniform)
  }
}

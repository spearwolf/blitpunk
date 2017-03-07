
export default class WebGlBuffer {
  constructor (glx, target = WebGlBuffer.ARRAY_BUFFER, usage = WebGlBuffer.STATIC_DRAW) {
    this.glx = glx

    const { gl } = glx
    this.target = gl[target]
    this.usage = gl[usage]

    this.glBuffer = gl.createBuffer()

    this.voArray = null
    // this.srcSerial = -1;
  }

  bindBuffer () {
    this.glx.bindBuffer(this.target, this.glBuffer)
  }

  bufferData () {
    // TODO voArray dirty/type check

    this.bindBuffer()
    this.glx.gl.bufferData(this.target, this.voArray.float32Array, this.usage)

    // TODO update srcSerial
  }
}

WebGlBuffer.ARRAY_BUFFER = 'ARRAY_BUFFER'
WebGlBuffer.ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER'

WebGlBuffer.STATIC_DRAW = 'STATIC_DRAW'
WebGlBuffer.DYNAMIC_DRAW = 'DYNAMIC_DRAW'

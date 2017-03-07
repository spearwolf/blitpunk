import ShaderVariableGroup from './shader_variable_group'
import ShaderAttribVariable from './shader_attrib_variable'
import ShaderAttribValue from './shader_attrib_value'
import ShaderVariableAlias from './shader_variable_alias'

/**
 * Group of shader variables which are referencing one single buffer.
 */
export default class ShaderVariableBufferGroup extends ShaderVariableGroup {
  /**
   * @param {VOPool} bufferSource
   */
  constructor (bufferSource) {
    super([])
    const descriptor = bufferSource.descriptor
    let firstVar
    Object.keys(descriptor.attr).forEach(attrName => {
      if (!firstVar) {
        firstVar = new ShaderAttribVariable(
          attrName,
          new ShaderAttribValue(
            attrName,
            descriptor,
            bufferSource
          ))
        this.shaderVars.push(firstVar)
      } else {
        this.shaderVars.push(new ShaderVariableAlias(attrName, firstVar))
      }
    })
  }

  get bufferSource () {
    return this.shaderVars[0].value.bufferSource
  }

  get serial () {
    return this.shaderVars[0].serial
  }

  touch () {
    return this.shaderVars[0].touch()
  }
}

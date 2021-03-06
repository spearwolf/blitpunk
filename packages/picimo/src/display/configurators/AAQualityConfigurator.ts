import {WebGLRendererParameters} from 'three';

import {TextureOptionClasses} from '../../textures';

import {Display} from '../Display';
import {IConfigurator} from '../IConfigurator';

export class AAQualityConfigurator implements IConfigurator {
  getWebGlRendererParameters(
    userParams?: WebGLRendererParameters,
  ): WebGLRendererParameters {
    const params: WebGLRendererParameters = {
      precision: 'highp',
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
      stencil: false,
      alpha: true,
      antialias: true,
    };
    return {
      ...params,
      ...userParams,
    };
  }

  getTextureFactoryOptions(): Array<TextureOptionClasses> {
    return ['anisotrophy', 'linear'];
  }

  getPixelRatio(): number {
    return 0; // => use native pixel ratio from window.devicePixelRatio
  }

  postSetup(_display: Display): void {}
}

import * as THREE from 'three';

const vertexShader = `

  attribute vec4 pos;
  attribute vec4 tex;

  attribute float yPos;

  varying vec2 vTexCoords;

  void main(void)
  {
    vec4 v = vec4(
      pos.x + (position.x * pos.z),
      yPos,
      pos.y + (position.y * pos.w),
      1.0);

    gl_Position = projectionMatrix * modelViewMatrix * v;

    vTexCoords = vec2(tex.x + (uv.x * tex.z), tex.y + (uv.y * tex.w));
  }

`;

const fragmentShader = `

  uniform sampler2D tex0;

  varying vec2 vTexCoords;

  void main(void) {
    gl_FragColor = texture2D(tex0, vec2(vTexCoords.s, vTexCoords.t));

    if (gl_FragColor.a == 0.0) {
      discard;
    }
  }

`;

export class TileQuadMaterial extends THREE.ShaderMaterial {
  constructor(texture: THREE.Texture) {
    super({
      vertexShader,
      fragmentShader,

      uniforms: {
        tex0: {
          value: texture,
        },
      },

      side: THREE.FrontSide,
      transparent: true,
      depthWrite: true,
      depthTest: false,
    });
  }
}

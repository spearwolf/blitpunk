import {sample, unpick} from '../utils';

import {ITexturable} from './ITexturable';
import {PowerOf2Image} from './PowerOf2Image';
import {Texture} from './Texture';

interface Features {
  [feature: string]: unknown;
}

export interface TextureAtlasFrameDescription extends Features {
  frame: {
    x: number;
    y: number;

    w: number;
    h: number;
  };

  baselineOffset?: number;
}

export interface TextureAtlasMetaDescription extends Features {
  image: string;

  lineHeight?: number;
}

export interface TextureAtlasDescription {
  frames: {
    [frameName: string]: TextureAtlasFrameDescription;
  };

  meta: TextureAtlasMetaDescription;
}

const filterFrameFeatures = unpick(['frame']) as any;

export class TextureAtlas implements ITexturable {
  /**
   * Load a texture atlas from json defintion
   */
  static async load(path: string, basePath = './') {
    const atlas = await fetch(`${basePath}${path}`).then((response) =>
      response.json(),
    );
    const baseTexture = new Texture(
      await new PowerOf2Image(`${basePath}${atlas.meta.image}`).loaded,
    );
    return new TextureAtlas(baseTexture, atlas);
  }

  baseTexture: Texture;

  private _frames = new Map<string, Texture>();

  private _allFrames: Texture[] = [];
  private _allFrameNames: string[] = [];

  private _features: Map<string, unknown> = null;

  constructor(baseTexture: Texture, data: TextureAtlasDescription) {
    this.baseTexture = baseTexture;

    Object.keys(data.frames).forEach((name) => {
      const frameData = data.frames[name];
      const {frame} = frameData;
      const features = filterFrameFeatures(frameData);
      this.addFrame(name, frame.w, frame.h, frame.x, frame.y, features);
    });

    const {meta} = data;
    if (meta !== undefined) {
      Object.keys(meta).forEach((name) => {
        this.setFeature(name, meta[name]);
      });
    }
  }

  getTextureSource() {
    return this.baseTexture;
  }

  addTexture(name: string, texture: Texture, features: Features = null) {
    this._allFrameNames.push(name);
    this._allFrames.push(texture);
    this._frames.set(name, texture);
    if (features != null) {
      Object.keys(features).forEach((name) => {
        texture.setFeature(name, features[name]);
      });
    }
  }

  addFrame(
    name: string,
    width: number,
    height: number,
    x: number,
    y: number,
    features: Features = null,
  ) {
    const tex = new Texture(this.baseTexture, width, height, x, y);
    this.addTexture(name, tex, features);
  }

  frame(name: string): Texture {
    return this._frames.get(name);
  }

  randomFrame() {
    return sample(this._allFrames);
  }

  randomFrames(count: number) {
    const frames: Texture[] = [];
    for (let i = 0; i < count; i++) {
      frames.push(sample(this._allFrames));
    }
    return frames;
  }

  frameNames(match?: string | RegExp) {
    if (match != null) {
      const regex = typeof match === 'string' ? new RegExp(match) : match;
      return this._allFrameNames.filter((name) => regex.test(name));
    }
    return this._allFrameNames;
  }

  randomFrameName() {
    return sample(this._allFrameNames);
  }

  getFeature(name: string, defaultValue: unknown = undefined): unknown {
    return this._features && this._features.has(name)
      ? this._features.get(name)
      : defaultValue;
  }

  setFeature(name: string, value: unknown) {
    if (this._features === null) {
      this._features = new Map();
    }
    this._features.set(name, value);
  }
}

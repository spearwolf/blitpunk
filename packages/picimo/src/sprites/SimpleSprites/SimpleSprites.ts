import {Material} from 'three';

import {SpriteGroupInstancedBufferGeometry} from '../SpriteGroupInstancedBufferGeometry';
import {SpriteGroupMesh} from '../SpriteGroupMesh';

import {ISimpleSprite} from './ISimpleSprite';
import {ISimpleSpriteBase} from './ISimpleSpriteBase';
import {getSimpleSpriteBaseGroup} from './SimpleSpriteBaseGroup';
import {SimpleSpriteBaseMethodsType} from './SimpleSpriteBaseMethods';
import {
  SimpleSpriteGroup,
  ISimpleSpriteGroupOptions,
} from './SimpleSpriteGroup';
import {SimpleSpriteMethodsType} from './SimpleSpriteMethods';

export interface ISimpleSpritesOptions extends ISimpleSpriteGroupOptions {}

/**
 * The simple sprites are rendered on the x/z plane (on the ground).
 */
export class SimpleSprites extends SpriteGroupMesh<
  SimpleSpriteMethodsType,
  ISimpleSprite,
  SimpleSpriteBaseMethodsType,
  ISimpleSpriteBase
> {
  sprites: SimpleSpriteGroup;

  constructor(material: Material, options?: ISimpleSpritesOptions) {
    const sprites = new SimpleSpriteGroup(options);
    const geometry = new SpriteGroupInstancedBufferGeometry(
      getSimpleSpriteBaseGroup(),
      sprites,
    );

    super(geometry, material);

    this.sprites = sprites;
  }
}

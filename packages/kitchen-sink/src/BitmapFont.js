/* eslint-env browser */
import {TextureAtlas, BitmapText2D, BitmapText2DBlock} from 'picimo';

import {debug} from './utils/debug';
import {makeExampleShell} from './utils/makeExampleShell';

const init = async ({display, scene, camera}) => {
  camera.position.y = 0;
  camera.position.z = 300;
  camera.lookAt(0, 0, 0);

  const text2d = new BitmapText2D({
    capacity: 1000,
    vertexShaderTransformHook: `
        p.y += 125.0 * sin((2.0 * time) + (p.x / 300.0) + (p.z / 100.0));
      `,
  });

  text2d.fontAtlas = await TextureAtlas.load('rbmfs.json', '/assets/rbmfs/');

  const measure = text2d.measureText('Rokko!\nClaudia...\n(Wolfger)');
  debug('measureText', measure);

  // ----------------------------------------------------------------------------------
  //
  // create some sprites and animations
  //
  // ----------------------------------------------------------------------------------

  const COUNT = 11;
  const STEP_Z = 30;

  let txt =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz .,-+@ 0123456789 _():!? ';

  for (let z = -0.5 * COUNT * STEP_Z, j = 0; j < COUNT; j++, z += STEP_Z) {
    text2d.drawText(txt, 0, 0, z, 0, 0, 0, 'center');

    const c = txt.substr(0, 8);
    txt = `${txt.substr(8)}${c}`;
  }

  const timeDisplay = new BitmapText2DBlock(
    text2d,
    [0, 0, 150],
    0,
    32,
    0,
    'center',
  );

  display.on('frame', ({now}) => {
    text2d.material.uniforms.time.value = ((0.125 * now) % Math.PI) * 2;

    timeDisplay.update(`time: ${Math.round(now)}`);
  });

  // ----------------------------------------------------------------------------------
  //
  // add to scene
  //
  // ----------------------------------------------------------------------------------

  scene.add(text2d);

  debug('text2d', text2d);
};

// ----------------------------------------------------------------------------------
//
// startup
//
// ----------------------------------------------------------------------------------

makeExampleShell(
  document.getElementById('container'),
  {
    mode: 'pixelated',
    resizeStrategy: 'fullscreen',
    autoRotate: false,
    showCube: false,
  },
  init,
);

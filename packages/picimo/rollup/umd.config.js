/* eslint-env node */
import path from 'path';

import {name, outputDir, external, makePlugins} from './shared.config';

export default {
  input: 'src/index.ts',
  output: {
    name,
    file: path.join(outputDir, `${name}.umd.js`),
    sourcemap: true,
    sourcemapFile: path.join(outputDir, `${name}.umd.js.map`),
    format: 'umd',
    globals: {
      three: 'THREE',
    },
  },
  external,
  plugins: makePlugins(),
};

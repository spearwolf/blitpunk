/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-env node */
import path from 'path';

import {get} from 'lodash';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

import {sizeSnapshot} from 'rollup-plugin-size-snapshot';
import {terser} from 'rollup-plugin-terser';

import createBannerPlugin from './bannerPlugin';

export const projectDir = path.resolve(
  path.join(path.dirname(__filename), '..'),
);
export const outputDir = projectDir; // path.join(projectDir, 'dist');

const packageJson = require(path.join(projectDir, 'package.json'));
export const bannerPlugin = () => createBannerPlugin(packageJson);

export const name = 'picimo';

export const extensions = ['.js', '.ts'];

export const external = ['three'];

export const makePlugins = (config = {}) =>
  [
    bannerPlugin(),
    commonjs(),
    config.babel !== false
      ? babel({
          extensions,
          rootMode: 'upward',
          runtimeHelpers: true,
          exclude: [/\/core-js\//, 'node_modules/@babel/**'],
          plugins: [['@babel/plugin-transform-runtime', {}]],
          presets: [
            [
              '@babel/preset-env',
              {
                debug: false,
                modules: false,
                useBuiltIns: 'usage',
                corejs: 3,
                bugfixes: true,
                loose: true,
                ...get(config, 'babel.presets.@babel/preset-env'),
              },
            ],
          ],
        })
      : null,
    resolve({
      extensions,
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    replace({
      NODE_ENV: JSON.stringify('production'),
      PACKAGE_VERSION: JSON.stringify(packageJson.version),
      'log.VERBOSE': 'false',
      'log.DEBUG': 'false',
    }),
    sizeSnapshot(),
    terser({
      output: {comments: /^!/},
    }),
  ].filter((plugin) => plugin != null);

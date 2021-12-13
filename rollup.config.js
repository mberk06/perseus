import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  input: 'src/perseus.js',
  external: (path) => !path.startsWith('.') && !path.startsWith('/'),
  output: {
    file: 'build/perseus.cjs',
    format: 'cjs',
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    visualizer({ filename: 'build/rollup-stats.html' }),
  ],
};

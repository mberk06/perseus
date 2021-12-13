import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  input: 'src/perseus.js',
  external: (path) => !path.startsWith('.') && !path.startsWith('/') && !path.endsWith('.css'),
  output: {
    file: 'perseus.cjs',
    format: 'cjs',
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    postcss({ extract: 'perseus.css' }),
    visualizer({ filename: 'rollup-stats.html' }),
  ],
};

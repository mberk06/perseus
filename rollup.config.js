import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'src/perseus.js',
  output: {
    file: 'build/perseus.cjs',
    format: 'cjs',
  },
  plugins: [json(), resolve(), commonjs(), babel({ babelHelpers: 'bundled' })]
};

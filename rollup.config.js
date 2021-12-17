import { readdirSync } from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

const localModules = readdirSync('src/node_modules').map((dirName) => dirName.replace(/\.js$/, ''));
console.log(localModules);

export default {
  input: 'src/perseus.js',
    external: (path) => {
        if (
            localModules.includes(path) ||
            path.startsWith('.') ||
            path.startsWith('/') ||
            path.endsWith('.css')
        ) {
            // Local files
            return false;
        }

        // TODO(aria): should i just load package.json here and read its deps?
        // package.json dependencies
        return true;
    },
  output: {
    file: 'perseus.js',
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

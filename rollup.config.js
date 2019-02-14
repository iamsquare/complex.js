import pkg from './package.json';

import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

module.exports = [
  {
    input: 'temp/index.js',
    output: {
      file: pkg.main,
      sourcemap: true,
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      resolve(),
      commonjs(),
      babel(),
      terser({
        mangle: false
      })
    ]
  },
  {
    input: 'temp/index.js',
    output: {
      file: pkg.module,
      sourcemap: true,
      format: 'esm'
    },
    plugins: [resolve(), commonjs(), babel()]
  }
];

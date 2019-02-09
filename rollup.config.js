import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';

module.exports = [
  {
    input: 'temp/index.js',
    output: {
      dir: 'lib/esm',
      sourcemap: true,
      format: 'esm'
    },
    plugins: [resolve(), commonjs(), babel()]
  },
  {
    input: 'temp/index.js',
    output: {
      name: 'complex.js',
      dir: 'lib/umd',
      sourcemap: true,
      format: 'umd',
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
  }
];

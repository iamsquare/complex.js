import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: 'temp/index.js',
  output: {
    file: 'complex.js',
    name: 'complex.js',
    dir: 'lib',
    format: 'umd'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel(),
    terser({
      mangle: false
    })
  ]
};

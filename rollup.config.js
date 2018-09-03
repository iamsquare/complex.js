import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
// import resolve from 'rollup-plugin-node-resolve';

module.exports = {
  input: 'temp/index.js',
  output: {
    file: 'complex.js',
    name: 'complex.js',
    dir: 'lib',
    format: 'umd'
  },
  plugins: [
    commonjs(),
    babel(),
    terser({
      mangle: false
    })
  ]
};

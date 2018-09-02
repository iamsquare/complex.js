import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

module.exports = {
  input: 'temp/complex.js',
  output: {
    file: 'complex.js',
    name: 'complex.js',
    dir: 'lib',
    format: 'umd',
  },
  plugins: [
    babel(),
    commonjs(),
    terser()
  ],
  treeshake: {
    pureExternalModules: true
  }
}

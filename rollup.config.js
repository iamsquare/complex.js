import pkg from './package.json';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

module.exports = [
  {
    input: 'dist/lib/index.js',
    output: {
      file: pkg.module,
      sourcemap: true,
      format: 'es'
    },
    plugins: [
      commonjs(),
      resolve()
    ]
  }
];

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

import pkg from './package.json' with { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [nodeResolve(), commonjs(), typescript({ tsconfig: './tsconfig.build.json' })],
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
      entryFileNames: '[name].mjs',
      sourcemap: true,
    },
    plugins: [nodeResolve(), typescript({ tsconfig: './tsconfig.build.json' })],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts({ tsconfig: './tsconfig.build.json' })],
  },
];

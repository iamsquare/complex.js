import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: ['evaluator.ts', 'parser.ts'],
    external: ['@iamsquare/complex.js'],
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: '.',
      entryFileNames: '[name].js',
      sourcemap: false,
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist/cjs',
        outDir: 'dist/cjs',
      }),
    ],
  },
  {
    input: ['evaluator.ts', 'parser.ts'],
    external: ['@iamsquare/complex.js'],
    output: {
      dir: 'dist/esm',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: '.',
      entryFileNames: '[name].mjs',
      sourcemap: false,
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.build.json',
        declaration: true,
        declarationDir: 'dist/esm',
        outDir: 'dist/esm',
      }),
    ],
  },
];

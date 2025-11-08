import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';

export default defineConfig(
  {
    ignores: ['**/node_modules', '**/dist', '**/docs', '**/coverage', '.husky/', '.vscode/', '.github/'],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{js,ts}'],
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier,
    },
    rules: {
      eqeqeq: ERROR,
      'no-unused-vars': OFF,
      '@typescript-eslint/no-unused-vars': [
        WARN,
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-debugger': OFF,
      'no-useless-escape': OFF,
      'no-empty': OFF,
      semi: WARN,
      'no-prototype-builtins': OFF,
      'simple-import-sort/imports': WARN,
      'simple-import-sort/exports': WARN,
      'prettier/prettier': WARN,
    },
  },
);

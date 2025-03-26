/* eslint-disable no-magic-numbers */
// @ts-check

/** @type {import('eslint').Linter.BaseConfig} */
const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:perfectionist/recommended-natural',
    'plugin:jest-dom/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:testing-library/react',
    'plugin:storybook/recommended',
  ],
  globals: {
    JSX: true,
    React: true,
  },
  overrides: [
    {
      files: ['**/*.{test,spec}.{ts,tsx}'],
      rules: {
        'no-magic-numbers': 'off',
      },
    },
    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'no-magic-numbers': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2023,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'perfectionist',
    'jest-dom',
    'testing-library',
    'tailwindcss',
    'vitest',
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'with-single-extends',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_.*?$',
        ignoreRestSiblings: false,
      },
    ],
    'arrow-body-style': ['error', 'as-needed'],
    'import/newline-after-import': 'error',
    'max-params': ['error', 3],
    'max-statements-per-line': ['error', { max: 1 }],
    'no-console': 'warn',
    'no-else-return': 'error',
    'no-magic-numbers': [
      'warn',
      {
        detectObjects: false,
        enforceConst: true,
        ignore: [-1, 0, 1, 2, 10, 100],
        ignoreArrayIndexes: true,
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'operator-assignment': ['error', 'always'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', next: 'return', prev: '*' },
      { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
      {
        blankLine: 'any',
        next: ['const', 'let', 'var'],
        prev: ['const', 'let', 'var'],
      },
    ],
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'testing-library/no-node-access': [
      'error',
      { allowContainerFirstChild: true },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

module.exports = config;

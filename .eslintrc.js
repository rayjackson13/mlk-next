const propTypeSortOrder = {
  callbacksLast: false,
  ignoreCase: false,
  noSortAlphabetically: false,
};

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:compat/recommended',
    'plugin:@next/next/recommended',
    // NOTE: This has to come last
    'plugin:prettier/recommended',
  ],
  globals: {
    React: 'readonly',
    JSX: 'readonly',
    webpack: 'readonly',
    __PATH_PREFIX__: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'public',
    '.next'
  ],
  plugins: ['@typescript-eslint', 'import', 'react', 'jest', 'prettier', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    impliedStrict: true,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'class-methods-use-this': 'off',
    curly: ['error', 'multi'],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'import/no-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off',
    'max-len': [
      'error',
      {
        code: 100,
        comments: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern: 'eslint-disable+',
      },
    ],
    'no-undef': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'react/boolean-prop-naming': ['error', { rule: '^(is|has|can)[A-Z]([A-Za-z0-9]?)+' }],
    'react/button-has-type': ['error', { reset: false }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'react/jsx-handler-names': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        ...propTypeSortOrder,
        shorthandFirst: false,
        shorthandLast: false,
        reservedFirst: false,
      },
    ],
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': [
      'error',
      {
        ...propTypeSortOrder,
        requiredFirst: true,
        sortShapeProp: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-ordering': ['error', { default: { order: 'alphabetically' } }],
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'no-console': ['warn', { allow: ['warn', 'error', 'debug'] }],
    'react/react-in-jsx-scope': ['off'],
    'prettier/prettier': ['warn']
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
      },
    },
    {
      files: ['*.d.ts', '*.stories.tsx', '.storybook/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.test.tsx', '*.stories.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['src/pages/**/*.tsx', 'src/pages/**/*.ts'],
      rules: {
        'import/no-default-export': 'off'
      }
    },
    {
      files: ['next.config.mjs'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ],
  settings: {
    'import/resolver': {
      "node": {
        "paths": ["src"]
      },
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
};

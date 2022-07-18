module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': ['error'],
    'react/button-has-type': ['error'],
    'no-console': ['warn'],
    'react/self-closing-comp': ['warn'],
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-fragments': ['warn'],
    'react/jsx-pascal-case': ['error'],
    'react/display-name': ['off'],
    'react/forbid-elements': ['warn', { forbid: ['Image'] }],
    'jsx-a11y/alt-text': [
      2,
      {
        elements: ['img', 'object', 'area', 'input[type="image"]'],
        img: ['Image', 'CustomImage'],
        object: ['Object'],
        area: ['Area'],
        'input[type="image"]': ['InputImage'],
      },
    ],

    // typescript
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
    '@typescript-eslint/array-type': ['warn', { default: 'array' }],
    '@typescript-eslint/no-empty-function': ['warn'],

    // typescript typechecking
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    // misc
    'no-console': ['warn'],
    'prefer-arrow-callback': ['warn'],
    // quotes: ['warn', 'single'],
    quotes: ['error', 'single', { avoidEscape: true }],
  },
};

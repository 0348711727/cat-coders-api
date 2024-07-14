module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "quotes": ["error", "single"],
    "comma-dangle": ["error", "always-multiline"],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "endOfLine": "auto"
      }
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "all",
        // "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        // "caughtErrorsIgnorePattern": "^_",
        // "destructuredArrayIgnorePattern": "^_",
        // "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true
      }
    ]
  }
};

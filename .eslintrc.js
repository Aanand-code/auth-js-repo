module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
        semi: false
      }
    ]
  }
}

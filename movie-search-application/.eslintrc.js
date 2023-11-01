module.exports = {

  parser: 'eslint-plugin-ejs/parser',
  plugins: ['ejs'],
  // ... other ESLint configuration settings

  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
  },
  extends: 'airbnb-base',
  overrides: [{
    env: {
      node: true,
    },
    files: [
      '.eslintrc.{js,cjs}',
    ],
    parserOptions: {
      sourceType: 'script',
    },
  }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};

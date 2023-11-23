module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jquery: true,
    ejs: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['**/*.ejs'],
      parser: 'html-eslint-parser',
      rules: {
        // Add or customize rules specific to EJS files
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // Add or customize general rules
  },
};

export default {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@stylistic/eslint-plugin-js',
  ],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-console': 'warn',
    'no-else-return': 'warn',
    eqeqeq: ["error", "always"],
    '@stylistic/js/quotes': ["error", "single"],
  },
}

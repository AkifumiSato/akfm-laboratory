/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  env: {
    "jest/globals": true,
  },
  plugins: ["jest"],
  extends: ["@repo/eslint-config/next.js", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    "styled-system/**/*",
    "cache-handler.js",
    "jest.config.js",
    "playwright.config.ts",
  ],
};

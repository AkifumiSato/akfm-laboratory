/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    "styled-system/**/*",
    "cache-handler.js",
    "vitest.config.mts",
    "playwright.config.ts",
  ],
};

/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}", "components/**/*.test.{ts,tsx}"],
    setupFiles: "./vitest.setup.ts",
    env: {
      GITHUB_CLIENT_ID: "GITHUB_CLIENT_ID",
      GITHUB_CLIENT_SECRET: "GITHUB_CLIENT_SECRET",
      SESSION_SECRET: "SESSION_SECRET",
    },
  },
});

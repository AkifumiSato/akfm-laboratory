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
  },
});

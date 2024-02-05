import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./components/**/*.stories.{ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        zIndex: {
          header: {
            value: 3,
          },
          modal: {
            value: 10,
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});

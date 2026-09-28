// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://beweb.com.ar",
  output: "static",
  build: {
    inlineStylesheets: "never",
  },
});

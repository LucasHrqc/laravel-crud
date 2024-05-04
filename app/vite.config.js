import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { transformAssetUrls } from "@quasar/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    fs: {
      strict: false, // Allow ESLint to work with Vite's dev server
    },
  },
});

import vue from "@vitejs/plugin-vue";
//@ts-ignore
import { transformAssetUrls } from "vite-plugin-vuetify";
import ViteFonts from "unplugin-fonts/vite";
import svgLoader from "vite-svg-loader";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Open Sans",
            styles: "wght@100;300;400;500;700;900",
          },
          {
            name: "JetBrains Mono",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
    svgLoader(),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: {
    port: 3000,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Main popup
        background: resolve(__dirname, "src/background.js"), // Background script
        contact: resolve(__dirname, "public/contact.html"), // Contact page
      },
      output: {
        entryFileNames: "[name].js", // Keep the file names consistent
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    emptyOutDir: true, // Clear out the dist directory before building
  },
});

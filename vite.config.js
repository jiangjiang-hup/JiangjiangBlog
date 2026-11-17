import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // Relative assets support GitHub Pages subdirectories and ordinary web servers.
  base: "./",
});

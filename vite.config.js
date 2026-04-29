import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/anteroom-website/" : "/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      parthui: path.resolve(__dirname, "./src"),
    },
  },
  root: "./playground", // Set the playground as the root
});
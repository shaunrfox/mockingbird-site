import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~/": path.resolve(__dirname, "./src"),
      "@styled-system": path.resolve(__dirname, "./styled-system"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});

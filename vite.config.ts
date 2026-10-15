import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Served from https://madhuratan.github.io/mspsolar/
export default defineConfig({
  base: "/mspsolar/",
  plugins: [react(), tailwindcss()],
  server: { port: 5173 },
});

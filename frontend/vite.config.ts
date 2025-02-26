import * as path from "path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig, loadEnv } from "vite"


const env = loadEnv("production", process.cwd(), "")
const HOST = env.VITE_API_HOST
const PORT = env.VITE_API_PORT
  ? Number(env.VITE_API_PORT)
  : 3000


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "public/assets"),
    },
  },
  server: {
    allowedHosts: ["www.anumoplastic.com", "anumoplastic.com"],
    host: HOST,
    port: PORT,
  },
  preview: {
    allowedHosts: ["www.anumoplastic.com", "anumoplastic.com"],
    host: HOST,
    port: PORT,
  },
})

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "certs/private.key")),
      cert: fs.readFileSync(path.resolve(__dirname, "certs/certificate.crt")),
    },
    proxy: {
      "/api": {
        target: "https://10.2.1.5:3000",
        changeOrigin: true,
        secure: true, //change this on deploy to true
      },
    },
    port: 443,
  },
});

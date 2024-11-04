import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    __CLOUDINARY_PUBLIC_NAME__: `"${process.env.CLOUDINARY_PUBLIC_NAME}"`
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "shared": path.resolve(__dirname, "./shared")
    },
  },
})

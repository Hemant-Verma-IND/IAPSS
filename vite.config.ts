import path from "path"
// --- THIS IS THE FIX ---
// We are now importing the 'swc' version, which is what's in your package.json
import react from "@vitejs/plugin-react-swc" 
import { defineConfig } from "vite"

export default defineConfig({
  // The plugin function call remains the same
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
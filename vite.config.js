import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const brandAssets = fileURLToPath(new URL("./src/assets/", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    // Logo, monograma y fuentes de marca viajan incrustados en el bundle (data URI): lo esencial se ve
    // sin esperar a la red en cualquier vista previa. El resto de recursos sigue el límite por defecto.
    assetsInlineLimit: (file) => (file.startsWith(brandAssets) ? true : undefined),
  },
  preview: { allowedHosts: true },
});

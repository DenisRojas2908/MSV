import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base relativa: funciona en GitHub Pages (/MSV/) y en local sin cambiar nada.
// Modo «feria» (npm run build:feria): un solo HTML con JS, CSS y la fuente Inter incluidos,
// que abre con doble clic, sin servidor y sin internet (auditoría independiente #16).
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: mode === 'feria' ? [react(), viteSingleFile()] : [react()],
  build: mode === 'feria' ? { outDir: 'feria', emptyOutDir: true, assetsInlineLimit: 100_000_000 } : {},
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
}));

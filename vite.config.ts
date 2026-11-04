import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// base relativa: funciona en GitHub Pages (/MSV/) y en local sin cambiar nada.
export default defineConfig({
  base: './',
  plugins: [react()],
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});

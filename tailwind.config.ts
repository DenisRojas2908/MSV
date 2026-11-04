import type { Config } from 'tailwindcss';

// Solo los 7 tokens de ESPECIFICACION.md §A.4 (D-17). `colors` reemplaza
// la paleta por defecto de Tailwind: cualquier otro color no existe.
// Las opacidades se escriben como `text-texto/60`.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      mallki: '#1F5F3F', // barra superior y botones
      crema: '#F7F3EA', // fondo
      blanco: '#FFFFFF', // tarjetas
      texto: '#1F2937', // texto
      verde: '#16A34A', // solo semáforo y alertas
      ambar: '#F59E0B', // solo semáforo y alertas
      rojo: '#DC2626', // solo semáforo y alertas
    },
    fontFamily: {
      sans: ['Inter', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;

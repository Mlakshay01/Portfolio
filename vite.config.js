import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 1. Alias 'buffer' for packages that explicitly import it
      'buffer': 'buffer',
    },
  },
  define: {
    // 2. This is the crucial step: force 'Buffer' and 'global' 
    //    to reference the polyfilled 'buffer' module.
    'Buffer': 'import.meta.env.MODE === "development" ? (await import("buffer")).Buffer : Buffer',
    'global': 'window',
    'process.env.NODE_DEBUG': 'false', // Sometimes needed to avoid 'process' errors
    'process.env.NODE_ENV': JSON.stringify('production'), // Recommended setting
  },
});
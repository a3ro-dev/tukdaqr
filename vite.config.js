import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
        security: resolve(import.meta.dirname, 'security.html'),
        terms: resolve(import.meta.dirname, 'terms.html'),
      },
    },
  },
});

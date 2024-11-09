import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.folioar.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  envDir: '.',
});
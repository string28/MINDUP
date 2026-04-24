import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  root: path.resolve(__dirname, 'client'),
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
});

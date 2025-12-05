import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Use base path for GitHub Pages in production, root path for local dev
  base: mode === 'production' ? '/mockingbird-site/' : '/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '~/': path.resolve(__dirname, './src/'),
      '@styled-system': path.resolve(__dirname, './styled-system'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
}));

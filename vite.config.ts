import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  // Base path is '/' since we're using custom domain (mkbd.org)
  base: '/',
  plugins: [reactRouter(), svgr()],
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
});

import url from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: '@mf-books',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/exposes/ExposedBooksMF',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});

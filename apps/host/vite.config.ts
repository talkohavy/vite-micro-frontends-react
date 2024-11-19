import url from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react-swc';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      manifest: true,
      remotes: {
        '@mf-books': 'mf_books@http://localhost:3001/mf-manifest.json',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext', // <--- or 'chrome89' , just as long as you have top-level-await in the runtime environment it's fine.
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
  },
});

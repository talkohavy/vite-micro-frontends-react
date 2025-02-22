import url from 'url';
import path from 'path';
import { defineConfig } from 'vite';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: 'http://localhost:3000',
  plugins: [
    react(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        // Note about the key for the object (i.e. '@mf-books'), it can be whatever you want. with this you'll do the import. i.e. '@mf-books/SomeComponent'
        mf_books: {
          name: 'mf_books', // <--- this needs to match the EXACT name of the remote MF.
          type: 'module', // <--- IMPORTANT!!! without this you'll get an error. Your remote vite apps are bundled as esm.
          entry: 'http://localhost:3001/remoteEntry.js',
        },
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
  ],
  clearScreen: false,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext', // <--- or 'chrome89' , just as long as you have top-level-await in the runtime environment it's fine.
    minify: false,
    // cssCodeSplit: false,
    // sourcemap: true,
  },
  css: {
    modules: {
      generateScopedName: '[name].123.[local].[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
    devSourcemap: true,
  },
});

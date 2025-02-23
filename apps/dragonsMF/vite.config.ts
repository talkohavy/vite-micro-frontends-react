import url from 'url';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'mf_dragons',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/exposes/ExposedDragonsMF',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
  ] as PluginOption[],
  server: {
    port: 3002,
    strictPort: true,
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
  css: {
    modules: {
      generateScopedName: '[name].[local].[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
    devSourcemap: true,
  },
});

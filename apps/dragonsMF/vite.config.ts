import url from 'url';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    // For a webpack host, you'll need to comment out the line below:
    react({ reactRefreshHost: 'http://localhost:3000' }),
    federation({
      name: '@mf/dragons',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './App': './src/exposes/ExposedDragonsMF',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
  ] as PluginOption[],
  server: {
    port: 3002,
    strictPort: true,
    origin: 'http://localhost:3002', // <--- Defines the origin of the generated asset URLs during development. Without this, the mf-manifest.json doesn't work!
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

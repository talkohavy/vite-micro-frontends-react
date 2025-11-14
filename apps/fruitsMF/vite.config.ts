import url from 'url';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import svgr from 'vite-plugin-svgr';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    // For a webpack host, you'll need to comment out the line below:
    react({ reactRefreshHost: 'http://localhost:3000' }),
    federation({
      name: '@mf/fruits',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './App': './src/exposes/ExposedFruitsMF',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
    svgr({
      include: '**/*.svg',
      svgrOptions: { exportType: 'named' },
    }),
  ] as PluginOption[],
  server: {
    port: 3004,
    strictPort: true,
    origin: 'http://localhost:3004',
  },
  base: 'http://localhost:3004',
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

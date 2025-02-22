import url from 'url';
import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import svgr from 'vite-plugin-svgr';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getSingleReactRefreshPlugin(): PluginOption {
  return {
    name: 'single-react-refresh', // Name for the plugin
    enforce: 'pre', // Run this plugin before other transformations
    transform(code, id) {
      if (/\.(js|ts|jsx|tsx)$/.test(id)) {
        const updatedCode = code.replace(
          /import RefreshRuntime from "\/@react-refresh";/g,
          `import RefreshRuntime from "http://localhost:3000/@react-refresh";`,
        );
        return updatedCode;
      }
      return null; // Return null if no transformation is applied
    },
  };
}

export default defineConfig({
  base: 'http://localhost:3001',
  plugins: [
    react(),
    getSingleReactRefreshPlugin(),
    federation({
      name: 'mf_books',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/exposes/ExposedBooksMF',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        // ref: true,
        // svgo: false,
        // titleProp: true,
      },
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
  css: {
    modules: {
      generateScopedName: '[name].123.[local].[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
    devSourcemap: true,
  },
});

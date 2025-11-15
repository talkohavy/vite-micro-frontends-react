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
      name: '@mf/books',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './App': './src/exposes/ExposedBooksMF',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
    svgr({
      include: '**/*.svg',
      svgrOptions: { exportType: 'named' },
    }),
  ] as PluginOption[],
  server: {
    port: 3001,
    strictPort: true,
    origin: 'http://localhost:3001', // <--- Defines the origin of the generated asset URLs during development. Without this, the mf-manifest.json doesn't work!
  },
  // base: 'http://localhost:3001',
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: './dist', // <--- this is relative to the `root` option.
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      generateScopedName: '[name].[local].[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        // Allow SASS to resolve imports from project root (so 'src/...' paths work)
        loadPaths: [path.resolve(__dirname)],
      },
    },
    devSourcemap: true,
  },
});

import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';
import { defineConfig, PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remoteEntryFileName = 'remoteEntry.js';
const remoteNameShort = 'fruits';
const remoteName = `@mf/${remoteNameShort}`;

export default defineConfig({
  plugins: [
    // For a webpack host, you'll need to comment out the line below:
    react({ reactRefreshHost: 'http://localhost:3000' }),
    svgr({
      include: '**/*.svg',
      svgrOptions: { exportType: 'named' },
    }),
    federation({
      name: remoteName,
      filename: remoteEntryFileName,
      manifest: true,
      exposes: {
        './App': './src/exposes/ExposedFruitsMF',
      },
      shared: ['react', 'react-dom'],
    }),
  ] as PluginOption[],
  server: {
    port: 3004,
    strictPort: true,
    origin: 'http://localhost:3004', // <--- Defines the origin of the generated asset URLs during development. Without this, the mf-manifest.json doesn't work!
  },
  preview: {
    port: 3004,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
    },
  },
  base: 'http://localhost:3004',
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
    cssCodeSplit: true,
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      generateScopedName: `${remoteNameShort}_[folder]_[name]_[local]__[hash:base64:5]`, // Folder= the folder where the css lives. Name= name of the css file (".css" not included). Local= name of the class inside the file.
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

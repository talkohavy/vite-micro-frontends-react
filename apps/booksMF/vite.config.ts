import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';
import { defineConfig, PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

const remoteEntryFileName = 'remoteEntry.js';
const remoteNameShort = 'books';
const remoteName = `@mf/${remoteNameShort}`;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        './App': './src/exposes/ExposedBooksMF',
        './Button': './src/exposes/Button',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
      // getPublicPath: `function() {return "http:localhost:3001/"}`,
    }),
  ] as PluginOption[],
  /**
   * This here (the `base`) is important for 2 things:
   * 1. loading the mf-manifest.json file.
   * 2. loading the css files for the components.
   *
   * When the default value is set (i.e. '/'), the css files & the mf-manifest.json tries to load chunks from the same origin (i.e. the host's origin).
   */
  base: 'http://localhost:3001',
  server: {
    port: 3001,
    strictPort: true,
    origin: 'http://localhost:3001', // <--- Defines the origin of the generated asset URLs during development. Without this, the mf-manifest.json doesn't work!
  },
  preview: {
    port: 3001,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      // 'Access-Control-Allow-Origin': '*',
    },
  },
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

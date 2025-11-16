import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';
import { defineConfig, PluginOption } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remoteEntryFileName = 'remoteEntry.js';
const remoteNameShort = 'dragons';
const remoteName = `@mf/${remoteNameShort}`;

export default defineConfig({
  plugins: [
    // For a webpack host, you'll need to comment out the line below:
    react({ reactRefreshHost: 'http://localhost:3000' }),
    federation({
      name: remoteName,
      filename: remoteEntryFileName,
      manifest: true,
      exposes: {
        './App': './src/exposes/ExposedDragonsMF',
      },
      shared: ['react', 'react-dom', 'react-refresh'],
    }),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (outputChunk) => {
        return outputChunk.fileName === remoteEntryFileName;
      },
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
  preview: {
    port: 3002,
    /**
     * Use `cors` to mimic getting CORS error. Without setting this, any request will be allowed.
     *
     * There are 2 ways to get hit by CORS `cors`:
     *
     * 1. using `cors` as an object
     * 2. using `headers['Access-Control-Allow-Origin']` and a wrong origin
     */
    // cors: {
    //   origin: 'http://test2.com',
    //   credentials: true,
    // },
    // headers: {
    //   'Access-Control-Allow-Origin': 'http://test.com',
    //   // 'Access-Control-Allow-Credentials': 'true',
    //   // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //   // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //   // 'Access-Control-Max-Age': '86400',
    //   // 'cache-control': 'no-store',
    // },
    // allowedHosts: ['http://localhost:8000'], // <--- never use `allowedHosts`, as it doesn't work. use `cors` (as an object) instead.
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

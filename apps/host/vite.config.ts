import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import url from 'url';
import { defineConfig, PluginOption } from 'vite';
import svgr from 'vite-plugin-svgr';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remoteEntryFileName = 'remoteEntry.js';
const remoteNameShort = 'host';
const remoteName = `@mf/${remoteNameShort}`;

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: { exportType: 'named' },
    }),
    federation({
      name: remoteName,
      filename: remoteEntryFileName,
      manifest: true,
      remotes: {
        // Note about the key for the object (i.e. '@mf-books'), it can be whatever you want. with this you'll do the import. i.e. '@mf-books/SomeComponent'
        '@mf/books': {
          name: '@mf/books', // <--- this needs to match the EXACT name of the remote MF.
          entry: 'http://localhost:3001/remoteEntry.js', // <--- try switching between mf-manifest.json and remoteEntry.js. Both should work when the remote vite.config set the origin correctly. When origin isn't set, only remoteEntry.js will work. Only with mf-manifest.json the dev-tool extension will work.
          type: 'module', // <--- IMPORTANT!!! without this you'll get an error. Your remote vite apps are bundled as esm.
        },
        '@mf/fruits': {
          name: '@mf/fruits', // <--- this needs to match the EXACT name of the remote MF.
          entry: 'http://localhost:3004/remoteEntry.js',
          type: 'module', // <--- IMPORTANT!!! without this you'll get an error. Your remote vite apps are bundled as esm.
        },
      },
      shared: ['react', 'react-dom', 'react-refresh'],
      runtimePlugins: ['./src/plugins/fetchManifestWithCredentialsPlugin'], // './src/plugins/runtimeDebugPlugin'
    }),
  ] as PluginOption[],
  server: {
    port: 3000,
    // open: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  clearScreen: false,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: './dist', // <--- this is relative to the `root` option.
    modulePreload: false,
    target: 'esnext', // <--- or 'chrome89' , just as long as you have top-level-await in the runtime environment it's fine.
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

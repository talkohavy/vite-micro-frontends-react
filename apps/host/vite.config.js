import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  root: `${process.cwd()}/src`, // <--- defaults to process.cwd(). where the index.html is located.
  publicDir: './public', // default is "public". The location of the public dir relative to the index.html file.
  base: '/', // default value is '/'. My workplace put '/app/' Base public path when served in development or production.
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  clearScreen: false, // <--- default is true. false prevents Vite from clearing the terminal screen when logging certain messages
  cacheDir: '../node_modules/.cache/vite',
  logLevel: 'info', // <--- default is info. Options are: info, warn, error, silent
  build: {
    outDir: '../dist', // <--- default is dist. Specify the output directory (relative to project root).
    // sourcemap: true, // <--- default is false. Options are: true, false, inline, hidden. Generate production source maps. If true, a separate sourcemap file will be created. If 'inline', the sourcemap will be appended to the resulting output file as a data URI. 'hidden' works like true except that the corresponding sourcemap comments in the bundled files are suppressed.
    assetsDir: 'assets', // <--- default is assets. Specify the directory to nest generated assets under (relative to build.outDir).
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false, // defaults to false. Enable/disable CSS code splitting. When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded. If disabled, all CSS in the entire project will be extracted into a single CSS file.
    manifest: true, // <--- When set to true, the build will also generate a manifest.json file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. When the value is a string, it will be used as the manifest file name. Defaults to false.
    emptyOutDir: true, // <--- defaults to true if outDir is inside root. By default, Vite will empty the outDir on build if it is inside project root. It will emit a warning if outDir is outside of root to avoid accidentally removing important files. You can explicitly set this option to suppress the warning. This is also available via command line as --emptyOutDir
  },
  preview: { port: 3000, strictPort: true, open: true },
});

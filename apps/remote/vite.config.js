import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  root: `${process.cwd()}/src`, // <--- defaults to process.cwd(). where the index.html is located.
  publicDir: './public', // default is "public". The location of the public dir relative to the index.html file.
  base: '/', // default value is '/'. My workplace put '/app/' Base public path when served in development or production.
  server: {
    port: 3001,
    strictPort: true,
    open: false,
  },
  plugins: [
    react(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js', // <--- default file name. "remoteEntry" is a convention.
      exposes: {
        './Button': './src/components/Button',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    target: 'esnext', // <--- important!
    outDir: '../dist', // <--- default is dist. Specify the output directory (relative to project root).
    // sourcemap: true, // <--- default is false. Options are: true, false, inline, hidden. Generate production source maps. If true, a separate sourcemap file will be created. If 'inline', the sourcemap will be appended to the resulting output file as a data URI. 'hidden' works like true except that the corresponding sourcemap comments in the bundled files are suppressed.
    assetsDir: 'assets', // <--- default is assets. Specify the directory to nest generated assets under (relative to build.outDir).
    modulePreload: false,
    minify: false,
    cssCodeSplit: false,
    manifest: true, // <--- When set to true, the build will also generate a manifest.json file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. When the value is a string, it will be used as the manifest file name. Defaults to false.
    emptyOutDir: true, // <--- defaults to true if outDir is inside root. By default, Vite will empty the outDir on build if it is inside project root. It will emit a warning if outDir is outside of root to avoid accidentally removing important files. You can explicitly set this option to suppress the warning. This is also available via command line as --emptyOutDir
  },
  preview: { port: 3001, strictPort: true, open: false },
  clearScreen: false, // <--- default is true. false prevents Vite from clearing the terminal screen when logging certain messages
  cacheDir: '../node_modules/.cache/vite',
  logLevel: 'info', // <--- default is info. Options are: info, warn, error, silent
});

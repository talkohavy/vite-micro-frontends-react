import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig((props) => {
  console.log('vite config props:', props);
  console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
  // const { mode, command, isPreview, isSsrBuild } = props;

  return {
    root: `${process.cwd()}/src`, // <--- defaults to process.cwd(). where the index.html is located.
    publicDir: './public', // default is "public". The location of the public dir relative to the index.html file.
    base: '/', // default value is '/'. My workplace put '/app/' Base public path when served in development or production.
    server: {
      port: 3001,
      strictPort: true,
      open: false,
    },
    build: {
      target: 'esnext', // <--- important!
      outDir: '../dist', // <--- default is dist. Specify the output directory (relative to project root).
      minify: 'esbuild', // <--- Options are: 'esbuild' (default) | 'terser'. The default is esbuild which is 20 ~ 40x faster than terser and only 1 ~ 2% worse compression. Terser must be installed when it is set to 'terser'.
      assetsDir: 'main', // <--- default is assets. Specify the directory to nest generated assets under (relative to build.outDir).
      sourcemap: true, // <--- default is false. Options are: true, false, inline, hidden. Generate production source maps. If true, a separate sourcemap file will be created. If 'inline', the sourcemap will be appended to the resulting output file as a data URI. 'hidden' works like true except that the corresponding sourcemap comments in the bundled files are suppressed.
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].[hash].js', // <--- defaults to assets/[name].[hash].js
          sourcemapFileNames: process.env.NODE_ENV === 'development' ? undefined : 'sourcemaps/[name].[hash].js.map', // <--- defaults to [name].[hash].js.map. You can also use one that's called [chunkhash].
          // assetFileNames: () => 'static/css/[name].[hash:12].[ext]', // <--- this is for css files! defaults to 'assets/'. Remote micro-frontends should not touch this! Otherwise the host would not get the css with the remoteEntry.js. Only hosts can uncomment this line.
          // sourcemapBaseUrl: 'http://localhost:5050', // When using sourcemaps, to the end of each '.js' file, a relative path is added which points to its sourcemap. By default, this relative path points to the root of the 'dist' folder. This is fine! because then in the serving server I can modify the req.url to point to the correct path, which is `sourcemaps/${sourcemapFilename}`, as you can see at `sourcemapFileNames`.
        },
      },
      emptyOutDir: true, // <--- defaults to true if outDir is inside root. By default, Vite will empty the outDir on build if it is inside project root. It will emit a warning if outDir is outside of root to avoid accidentally removing important files. You can explicitly set this option to suppress the warning. This is also available via command line as --emptyOutDir
      cssCodeSplit: false, // defaults to false. Enable/disable CSS code splitting. When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded. If disabled, all CSS in the entire project will be extracted into a single CSS file.
      manifest: true, // <--- When set to true, the build will also generate a manifest.json file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. When the value is a string, it will be used as the manifest file name. Defaults to false.
      modulePreload: false, // <--- defaults to true.
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
        mode: 'anything-but-development-no-need-to-match', // <--- avoid putting 'development' as value at all costs! The value 'development' crashes vite's build process! It is specific to the value of 'development'; Other values work fine.
      }),
    ],
    preview: { port: 3001, strictPort: true, open: false },
    clearScreen: false, // <--- default is true. false prevents Vite from clearing the terminal screen when logging certain messages
    cacheDir: '../node_modules/.cache/vite',
    logLevel: 'info', // <--- default is info. Options are: info, warn, error, silent
  };
});

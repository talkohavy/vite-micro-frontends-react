import path from 'node:path';
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react-swc';

const rootDir = path.join(__dirname, '../../../../');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log('VITE running in mode:', mode);

  return {
    root: `${process.cwd()}/src`, // <--- defaults to process.cwd(). where the index.html is located.
    publicDir: './public', // default is "public". The location of the public dir relative to the index.html file.
    base: '/', // default value is '/'. My workplace put '/app/' Base public path when served in development or production.
    server: {
      port: 3000,
      strictPort: true,
      open: true,
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    envDir: rootDir,
    build: {
      target: 'esnext', // <--- important! Defaults to 'modules'.
      modulePreload: false, // <--- defaults to true
      outDir: '../dist', // <--- default is dist. Specify the output directory (relative to project root).
      assetsDir: 'main', // <--- default is assets. Specify the directory to nest generated assets under (relative to build.outDir).
      minify: 'esbuild', // <--- Options are: 'esbuild' (default) | 'terser'. The default is esbuild which is 20 ~ 40x faster than terser and only 1 ~ 2% worse compression. Terser must be installed when it is set to 'terser'.
      sourcemap: true, // <--- default is false. Options are: true, false, inline, hidden. Generate production source maps. If true, a separate sourcemap file will be created. If 'inline', the sourcemap will be appended to the resulting output file as a data URI. 'hidden' works like true except that the corresponding sourcemap comments in the bundled files are suppressed.
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].[hash].js', // <--- defaults to assets/[name].[hash].js
          sourcemapFileNames: process.env.NODE_ENV === 'development' ? undefined : 'sourcemaps/[name].[hash].js.map', // <--- defaults to [name].[hash].js.map. You can also use one that's called [chunkhash].
          assetFileNames: () => 'static/css/[name].[hash:12].[ext]', // <--- this is for css files! defaults to 'assets/'. Remote micro-frontends should not touch this! Otherwise the host would not get the css with the remoteEntry.js. Only hosts can uncomment this line.
          // sourcemapBaseUrl: 'http://localhost:5050', // When using sourcemaps, to the end of each '.js' file, a relative path is added which points to its sourcemap. By default, this relative path points to the root of the 'dist' folder. This is fine! because then in the serving server I can modify the req.url to point to the correct path, which is `sourcemaps/${sourcemapFilename}`, as you can see at `sourcemapFileNames`.
        },
      },
      emptyOutDir: true, // <--- defaults to true if outDir is inside root. By default, Vite will empty the outDir on build if it is inside project root. It will emit a warning if outDir is outside of root to avoid accidentally removing important files. You can explicitly set this option to suppress the warning. This is also available via command line as --emptyOutDir
      cssCodeSplit: false, // defaults to false. Enable/disable CSS code splitting. When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded. If disabled, all CSS in the entire project will be extracted into a single CSS file.
      manifest: true, // <--- When set to true, the build will also generate a manifest.json file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. When the value is a string, it will be used as the manifest file name. Defaults to false.
      chunkSizeWarningLimit: 500, // <--- default is 500. Limit for chunk size warnings (in kbs).
      assetsInlineLimit: 4096, // <--- default is 4096. Imported or referenced assets that are smaller than this threshold will be inlined as base64 URLs to avoid extra http requests. Set to 0 to disable inlining altogether.
    },
    plugins: [
      react(),
      federation({
        name: 'app',
        remotes: {
          // mf_remote: 'http://localhost:3001/main/remoteEntry.js', // <--- the simple form!
          mf_remote: {
            externalType: 'url',
            external: 'http://localhost:3001/main/remoteEntry.js',
            format: 'esm', // <--- defaults to 'esm'. Options are: 'esm' | 'var' | 'systemjs'.
            from: 'vite', // <--- defaults to 'vite'. Options are: 'vite' | 'webpack'.
          },
          mf_books: 'http://localhost:3002/main/remoteEntry.js',
        },
        // - Shared simple form:
        // shared: ['react', 'react-dom'],
        // - Shared complex form:
        shared: {
          react: {
            import: true, // <--- defaults to true
            shareScope: 'default', // <--- defaults to 'default'
            generate: true, // defaults to true. generate a shared chunk file or not , if you make sure that the host side has a share that can be used, then you can set not to generate a shared file on the remote side to reduce the size of the remote's chunk file, which is only effective on the remote side, the host side will generate a shared chunk no matter what.
            // version: '', // <--- Only works on host side, the version of the shared module provided is version of the package.json file in the shared package by default, you need to configure it manually only if you can't get version by this method
            // requiredVersion: '', // <--- Only for the remote side, it specifies the required version of the host shared used, when the version of the host side does not meet the requiredVersion requirement, it will use its own shared module, provided that it is not configured with import=false, which is not enabled by default
          },
          'react-dom': {},
        },
        mode: 'anything-but-development-no-need-to-match', // <--- avoid putting 'development' as value at all costs! The value 'development' crashes vite's build process! It is specific to the value of 'development'; Other values work fine.
      }),
    ],
    preview: { port: 3000, strictPort: true, open: false },
    clearScreen: false, // <--- default is true. false prevents Vite from clearing the terminal screen when logging certain messages
    cacheDir: '../node_modules/.cache/vite',
    logLevel: 'info', // <--- default is info. Options are: info, warn, error, silent
    css: {
      modules: {
        generateScopedName: mode === 'development' ? '[name].[local].[hash:base64:3]' : '[hash:base64:7]',
        localsConvention: 'camelCaseOnly',
        // scopeBehaviour: 'local'
      },
      devSourcemap: true,
      transformer: 'postcss', // <--- Options are: 'postcss' (default) | 'lightningcss'. While Lightning CSS handles the most commonly used PostCSS plugins like autoprefixer, postcss-preset-env, and CSS modules, you may still need PostCSS for more custom plugins like TailwindCSS. If that's the case, your PostCSS config will be picked up automatically.
    },
  };
});

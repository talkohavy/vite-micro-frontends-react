import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      manifest: true,
      remotes: {
        '@mf-books': 'mf_books@http://localhost:3001/mf-manifest.json',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3000,
  },
});

// import { defineConfig } from '@rsbuild/core';
// import { pluginReact } from '@rsbuild/plugin-react';
// import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

// export default defineConfig({
//   plugins: [
//     pluginReact(),
//     pluginModuleFederation({
//       name: 'host',
//       exposes: {
//         './button': './src/button.tsx',
//       },
//       shared: ['react', 'react-dom'],
//     }),
//   ],
//   server: {
//     port: 3000,
//   },
// });

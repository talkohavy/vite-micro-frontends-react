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
        mf_books: 'mf_books@http://localhost:3001/mf-manifest.json',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
  source: {
    entry: {
      index: './src/index.ts', // <--- defaults to './src/index.{ts|js|...}'
    },
  },
});

import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
    server: {
        port: 3005,
        open: false,
        // base: '/', // <--- defaults to '/'
        // htmlFallback: 'index', // <--- defaults to 'index'. If a request meets the following conditions but no corresponding static asset exists, server.htmlFallback triggers and falls back to index.html by default:
    },
    plugins: [
        pluginReact(),
        pluginModuleFederation({
            name: 'mf_rsbuild',
            filename: 'remoteEntry.js',
            manifest: true,
            exposes: {
                './App': './src/exposes/ExposedRsBuildMF',
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true, // <--- without this, there would be an error
                },
                'react-dom': {
                    singleton: true,
                    eager: true, // <--- without this, there would be an error
                },
            },
        }),
    ],
    source: {
        entry: {
            index: './src/main.tsx', // <--- defaults to './src/index.tsx'
        },
    },
    // The option of `moduleFederation` can only implement module federation v1.5 !!! (not v2.0)
    // moduleFederation: { options: {} },
});

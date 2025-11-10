# Webpack Host - Setup Guide

## Overview

This is a **webpack-based replica** of the `host` application. Every single source file, component, and utility (including `useFederatedComponent`) has been copied exactly from the original host app. The only differences are the build tooling configuration.

## ✅ What Has Been Replicated

### Exact Copies:
- ✅ **All source code** (`src/` directory)
- ✅ **useFederatedComponent** hook - 100% identical implementation
- ✅ **All components** (Layout, ErrorBoundaries, Controls, etc.)
- ✅ **All pages** (HomePage, BooksMF, DragonsMF, PageNotFound)
- ✅ **All utilities and hooks**
- ✅ **Redux store configuration**
- ✅ **Routing configuration**
- ✅ **Styling** (CSS, SCSS, CSS Modules)
- ✅ **ESLint configuration**
- ✅ **Prettier configuration**
- ✅ **TypeScript configuration** (adapted for webpack)

### Build Tool Changes:
- ❌ **Removed:** Vite, vite.config.ts, @vitejs/plugin-react, @module-federation/vite
- ✅ **Added:** Webpack, webpack.config.js, webpack loaders, @module-federation/enhanced

## Installation

```bash
cd apps/webpack-host
pnpm install
```

## Running the Application

### Development Mode
```bash
pnpm dev
```
This will start the webpack dev server on `http://localhost:3000`

### Production Build
```bash
pnpm build
```
This will create a production bundle in the `dist/` directory

### Serve Production Build
```bash
pnpm serve
```

## Key Configuration Files

### webpack.config.js
- Configures Module Federation with `@module-federation/enhanced/webpack`
- Sets up loaders for TypeScript, CSS/SCSS, CSS Modules, SVG
- Configures dev server on port 3000
- Defines path alias `@src` -> `src/`

### package.json
- Uses webpack 5 and webpack-cli
- Uses `@module-federation/enhanced` v0.8.9+
- All React, Redux, and routing dependencies match the original host

### postcss.config.js
- Configures autoprefixer for CSS processing

### tsconfig.json
- Identical to host tsconfig except target is ES2020 (webpack compatible)
- Uses Bundler module resolution
- Supports path aliases

## useFederatedComponent Hook

The hook is located at `src/common/utils/useFederatedComponent/` and consists of:

```
useFederatedComponent/
├── index.ts                          # Main export
├── useFederatedComponent.ts          # Main hook
├── types.ts                          # Type definitions
└── logic/
    ├── constants.ts                  # RemoteBundleType enum, caches
    ├── hooks/
    │   ├── useInitMicroFrontend.ts   # Registers remotes with MF runtime
    │   ├── useLoadedComponent.ts     # Loads and caches components
    │   └── useSanityCheck.ts         # Validates props
    └── utils/
        └── loadComponent.ts          # Loads remote modules
```

### How It Works

The hook uses `@module-federation/enhanced/runtime` which is **bundler-agnostic**:
- `registerRemotes()` - Registers remote apps dynamically
- `loadRemote()` - Loads exposed modules from remotes

This means the **exact same code** works with both Vite and webpack!

## Module Federation Configuration

In `webpack.config.js`:

```javascript
new ModuleFederationPlugin({
  name: 'host',
  filename: 'remoteEntry.js',
  remotes: {
    mf_books: 'mf_books@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.2.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.2.0' },
  },
})
```

## Loader Configuration

### TypeScript
- Uses `ts-loader` with `transpileOnly: true` for faster builds

### CSS Modules
- Pattern: `*.module.css` or `*.module.scss`
- Generated class names: `[name].[local].[hash:base64:5]`
- Convention: `camelCaseOnly`

### SVG
- Uses `@svgr/webpack` to transform SVGs into React components
- Export type: `named`

### Images
- PNG, JPG, JPEG, GIF, WEBP handled as assets

## Differences from Vite Host

| Feature | Vite Host | Webpack Host |
|---------|-----------|--------------|
| Build Tool | Vite | Webpack 5 |
| Dev Server | Vite dev server | webpack-dev-server |
| Config File | vite.config.ts | webpack.config.js |
| MF Plugin | @module-federation/vite | @module-federation/enhanced/webpack |
| TypeScript | Native via esbuild | ts-loader |
| HMR | Vite HMR | webpack HMR |
| **Source Code** | **100% Identical** | **100% Identical** |
| **useFederatedComponent** | **100% Identical** | **100% Identical** |

## Verification

To verify the setup is correct:

1. **Check useFederatedComponent:**
   ```bash
   cat src/common/utils/useFederatedComponent/useFederatedComponent.ts
   ```
   Should be identical to the Vite host version

2. **Start dev server:**
   ```bash
   pnpm dev
   ```
   Should start on http://localhost:3000

3. **Check Module Federation:**
   - Open browser DevTools → Network tab
   - Visit http://localhost:3000
   - Should see `remoteEntry.js` loaded from port 3001 (if booksMF is running)

## Troubleshooting

### Issue: Module not found errors
**Solution:** Make sure all dependencies are installed:
```bash
pnpm install
```

### Issue: TypeScript errors about imports
**Solution:** Check that `@src/*` path alias is working:
```bash
# Should be in tsconfig.json:
"paths": {
  "@src/*": ["src/*"]
}
```

### Issue: CSS Modules not working
**Solution:** Ensure files are named `*.module.css` or `*.module.scss`

### Issue: Remote federation errors
**Solution:** 
1. Make sure the remote app (e.g., booksMF) is running on port 3001
2. Check CORS headers are enabled
3. Verify remote URL in webpack.config.js matches actual remote location

## Next Steps

1. Start the remote apps you want to consume (e.g., booksMF on port 3001)
2. Start this webpack-host: `pnpm dev`
3. Navigate to the routes that use federated components
4. Verify everything works identically to the Vite host

## Notes

- This app is a **drop-in replacement** for the Vite host
- All application logic, styling, and functionality is preserved
- The webpack configuration is optimized for development and production
- Module Federation runtime is identical between both hosts


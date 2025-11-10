# Webpack MF - Module Federation Remote

This is a **webpack-based remote micro-frontend** using **@module-federation/enhanced**. It exposes components that can be consumed by any Module Federation host (Vite or webpack).

## Key Features

- ✅ **Webpack 5** with Module Federation
- ✅ **@module-federation/enhanced** (v0.8.9+)
- ✅ **Exposes components** via Module Federation
- ✅ **TypeScript** with full type support
- ✅ **React 19.2.0**
- ✅ **SCSS/CSS Modules** support
- ✅ **SVG as React components** via @svgr/webpack
- ✅ **Standalone mode** for development

## Installation

```bash
cd apps/webpackMF
pnpm install
```

## Available Scripts

- `pnpm dev` - Start development server on port 3003
- `pnpm build` - Build for production
- `pnpm serve` - Serve production build
- `pnpm lint` - Run ESLint

## Module Federation Configuration

### Remote Configuration

```javascript
name: 'mf_webpack'
port: 3003
exposes: {
  './App': './src/exposes/ExposedWebpackMF'
}
shared: ['react', 'react-dom']
```

### Consuming from a Host

#### From webpack-host:

```typescript
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import { RemoteBundleType } from '@src/common/utils/useFederatedComponent/logic/constants';

function WebpackMFPage() {
  const { Component } = useFederatedComponent({
    remoteName: 'mf_webpack',
    moduleName: 'App',
    remoteEntryUrl: 'http://localhost:3003/remoteEntry.js',
    type: RemoteBundleType.Commonjs, // webpack uses 'var' by default
  });

  if (!Component) return <div>Loading...</div>;
  
  return <Component />;
}
```

#### From Vite host:

```typescript
const WebpackMFApp = lazy(() => import('mf_webpack/App'));

function WebpackMFPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WebpackMFApp />
    </Suspense>
  );
}
```

And in `vite.config.ts`:

```typescript
remotes: {
  mf_webpack: {
    name: 'mf_webpack',
    type: 'var', // webpack builds as 'var' format
    entry: 'http://localhost:3003/remoteEntry.js',
  },
}
```

## Exposed Components

### `./App` - ExposedWebpackMF

The main exposed component showcasing the webpack micro-frontend.

**Location:** `src/exposes/ExposedWebpackMF.tsx`

**Features:**
- Styled with CSS Modules (SCSS)
- Displays webpack MF information
- Feature grid with hover effects

## Standalone Development

When you run `pnpm dev`, the app runs in **standalone mode** on `http://localhost:3003`. This allows you to:

- Develop and test the component independently
- Preview how it looks before consuming it in a host
- Test styling and functionality

## Architecture

```
webpackMF/
├── src/
│   ├── exposes/              # Components exposed via Module Federation
│   │   ├── ExposedWebpackMF.tsx
│   │   └── ExposedWebpackMF.module.scss
│   ├── standalone/           # Standalone mode wrapper
│   │   └── StandaloneWebpackMF.tsx
│   ├── main.tsx             # Entry point (async imports bootstrap)
│   └── bootstrap.tsx        # Actual application entry
├── webpack.config.js        # Webpack + Module Federation config
├── package.json
└── tsconfig.json
```

## CSS Modules Configuration

CSS Modules are configured with:
- Pattern: `*.module.css` or `*.module.scss`
- Generated class names: `[name].[local].[hash:base64:5]`
- Convention: `camelCaseOnly`
- **Critical:** `esModule: false` for compatibility

## Differences from Vite Remotes

| Feature | Vite Remote | Webpack Remote |
|---------|-------------|----------------|
| Build Tool | Vite | Webpack 5 |
| Module Format | ESM (`module`) | CommonJS/UMD (`var`) |
| Bundle Type | `RemoteBundleType.Module` | `RemoteBundleType.Commonjs` |
| Fast Refresh | Can be enabled | webpack HMR |

## Important Notes

### 1. Async Bootstrap Pattern

Webpack requires the entry point to use async imports:

**`main.tsx`:**
```typescript
import('./bootstrap');
export {};
```

This creates an async boundary required for Module Federation.

### 2. Module Format

Webpack builds as **'var'** format by default, while Vite builds as **'module'** (ESM). When consuming this remote:
- Use `type: RemoteBundleType.Commonjs` or `type: 'var'`
- Don't use `type: RemoteBundleType.Module`

### 3. Shared Dependencies

Only `react` and `react-dom` are shared. Each is configured as singleton to ensure only one instance is used across the entire application.

## Port Configuration

- Development Server: `http://localhost:3003`
- Remote Entry: `http://localhost:3003/remoteEntry.js`

## TypeScript Configuration

- Module: ESNext
- Module Resolution: Bundler
- Target: ES2020 (webpack compatible)
- Path aliases: `@src/*` for cleaner imports

## CSS Loaders

The webpack config includes proper loaders for:
- Plain CSS
- CSS Modules (`.module.css`)
- SCSS
- SCSS Modules (`.module.scss`)
- **Order matters:** CSS Modules rules come before plain CSS rules

## Troubleshooting

### Issue: "Module not found" when consuming

**Solution:** Ensure the webpackMF dev server is running on port 3003 and the remote entry URL is accessible.

### Issue: CSS Modules returning undefined

**Solution:** Ensure `esModule: false` is set in css-loader options (already configured).

### Issue: Type errors when importing

**Solution:** The consuming host needs type definitions for the remote. You can generate them or use `any` temporarily.

## Next Steps

1. Start the dev server: `pnpm dev`
2. Visit `http://localhost:3003` to see standalone mode
3. Consume from a host using the examples above
4. Customize the exposed component in `src/exposes/ExposedWebpackMF.tsx`

## Summary

This webpack remote MF demonstrates:
- ✅ Proper Module Federation configuration for webpack
- ✅ Component exposure via `exposes`
- ✅ CSS Modules with SCSS
- ✅ Standalone development mode
- ✅ Cross-bundler compatibility (works with both Vite and webpack hosts)

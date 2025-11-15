# Webpack Host - Module Federation

This is a **webpack-based** host application using **@module-federation/enhanced** for micro-frontends. It is an exact replica of the Vite-based `host` app, but configured to use webpack instead.

## Key Features

- ✅ **Webpack 5** with Module Federation
- ✅ **@module-federation/enhanced** (latest version)
- ✅ **Exact replica of useFederatedComponent** - The custom hook for loading remote micro-frontends
- ✅ **TypeScript** with full type support
- ✅ **React 19.2.0** with React Compiler support
- ✅ **SCSS/CSS Modules** support
- ✅ **SVG as React components** via @svgr/webpack
- ✅ **Redux Toolkit** for state management
- ✅ **React Router v7** for routing

## Installation

```bash
pnpm install
```

## Available Scripts

- `pnpm dev` - Start development server on port 3000
- `pnpm build` - Build for production
- `pnpm serve` - Serve production build
- `pnpm lint` - Run ESLint

## Module Federation Configuration

The app is configured to consume remote micro-frontends:

```javascript
remotes: {
  '@mf/books': '@mf/books@http://localhost:3001/remoteEntry.js',
}
```

## useFederatedComponent Hook

The core of the dynamic module federation loading is handled by the `useFederatedComponent` hook located at `src/common/utils/useFederatedComponent/`.

### Usage Example

```typescript
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import { RemoteBundleTypes } from '@src/common/utils/useFederatedComponent/logic/constants';

function MyPage() {
  const { Component } = useFederatedComponent({
    remoteName: '@mf/books',
    remoteEntryUrl: 'http://localhost:3001/remoteEntry.js',
    moduleName: './ExposedBooksMF',
    type: RemoteBundleTypes.Module,
  });

  if (!Component) return <div>Loading...</div>;

  return <Component />;
}
```

### Hook Structure

The hook is composed of three main pieces:

1. **useSanityCheck** - Validates required props
2. **useInitMicroFrontend** - Registers the remote with Module Federation runtime
3. **useLoadedComponent** - Lazy loads and caches the remote component

## Architecture

This application maintains the exact same architecture as the Vite-based host:

- **Layout** - Sidebar navigation with dark mode toggle
- **Routing** - React Router with lazy-loaded pages
- **State Management** - Redux Toolkit with user slice
- **Error Boundaries** - Development-friendly error handling
- **Theming** - Dark/Light theme support

## Differences from Vite Host

The main differences are:

1. **Build Tool**: webpack instead of Vite
2. **Dev Server**: webpack-dev-server instead of Vite dev server
3. **Configuration**: `webpack.config.js` instead of `vite.config.ts`
4. **Module Federation Plugin**: `@module-federation/enhanced/webpack` instead of `@module-federation/vite`

Everything else, including the source code, useFederatedComponent implementation, and application logic, is identical.

## TypeScript Configuration

The TypeScript configuration uses:

- Module: ESNext
- Module Resolution: Bundler
- Target: ES2020
- Path aliases: `@src/*` for cleaner imports

## Port Configuration

- Development Server: `http://localhost:3000`
- Expects remote apps on: `http://localhost:3001` (books), etc.

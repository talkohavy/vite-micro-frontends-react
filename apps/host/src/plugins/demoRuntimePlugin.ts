import {
  AfterResolveOptions,
  BeforeInitOptions,
  BeforeLoadShareOptions,
  BeforeRequestOptions,
  CreateScriptOptions,
  ErrorLoadRemoteOptions,
  GeneratePreloadAssetsOptions,
  HandlePreloadModuleOptions,
  InitOptions,
  OnLoadOptions,
  PreloadAssets,
  ResolveShareOptions,
} from './types';

export default function demoRuntimePlugin() {
  return {
    name: 'module-federation-example-runtime-plugin',
    /**
     * Updates the corresponding init configuration before the MF instance is initialized.
     */
    beforeInit(args: BeforeInitOptions) {
      return args;
    },
    /**
     * Called after the MF instance is initialized.
     */
    init(args: InitOptions) {
      console.log('init: ', args);
      return args;
    },
    /**
     * Called before resolving the remote path, useful for updating something before lookup.
     */
    beforeRequest(args: BeforeRequestOptions) {
      console.log('before request hook', args);
      return args;
    },
    /**
     * Called after resolving the remote path, allowing modification of the resolved content.
     */
    afterResolve(args: AfterResolveOptions) {
      console.log('after resolve hook', args);
      return args;
    },
    /**
     * Triggered once a federated module is loaded, allowing access and modification to the exports of the loaded file.
     */
    onLoad(args: OnLoadOptions) {
      console.log('on load hook', args);
      return args;
    },
    handlePreloadModule(args: HandlePreloadModuleOptions) {
      console.log('handle preload module hook', args);
      return args;
    },
    /**
     * Called before loading shared, can be used to modify the corresponding shared configuration.
     */
    beforeLoadShare(args: BeforeLoadShareOptions) {
      console.log('beforeLoadShare: ', args);
      return args;
    },
    /**
     * Called if loading remotes fails, enabling custom error handling. Can return a custom fallback logic.
     */
    errorLoadRemote(args: ErrorLoadRemoteOptions) {
      const { lifecycle, id, error } = args;

      // Log error details safely
      if (error) {
        console.warn(`Failed to load remote ${id} at ${lifecycle}:`, error?.message || error);
      }

      // Handle different error types based on lifecycle
      switch (lifecycle) {
        case 'afterResolve':
          // Manifest loading failed - provide fallback manifest or alternative URL
          return {
            id: id || 'fallback',
            name: id || 'fallback',
            metaData: {
              /* fallback manifest */
            },
            shared: [],
            remotes: [],
            exposes: [],
          };

        case 'beforeRequest':
          // Request processing failed - can return modified args or void
          console.warn(`Request processing failed for ${id}`);
          return void 0;

        case 'onLoad':
          // Module loading failed - provide fallback component
          return () => ({
            __esModule: true,
            default: () => 'Fallback Component',
          });

        case 'beforeLoadShare':
          // Shared dependency loading failed - return fallback shared module
          console.warn(`Shared dependency loading failed for ${id}`);
          return () => ({
            __esModule: true,
            default: {},
          });

        default:
          // Unknown lifecycle - log and return void
          console.warn(`Unknown lifecycle ${lifecycle} for ${id}`);
          return void 0;
      }
    },
    /**
     * Allows manual setting of the actual shared module to be used.
     */
    resolveShare(args: ResolveShareOptions) {
      // Example implementation:
      const { shareScopeMap, scope, pkgName, version } = args;

      if (pkgName !== 'react') {
        return args;
      }

      args.resolver = function () {
        shareScopeMap[scope][pkgName][version] = window.React; // replace local share scope manually with desired module
        return shareScopeMap[scope][pkgName][version];
      };
      return args;
    },
    generatePreloadAssets(args: GeneratePreloadAssetsOptions): Promise<PreloadAssets> {
      console.log('generate preload assets hook', args);
      return {} as any;
    },
    createScript(args: CreateScriptOptions): HTMLScriptElement | void {
      const { url } = args;

      if (url === 'http://localhost:3001/remoteEntry.js') {
        const script = document.createElement('script');
        script.src = url;
        script.setAttribute('loader-hooks', 'isTrue');
        script.setAttribute('crossorigin', 'anonymous'); // <--- 'anonymous', 'use-credentials'
        return script;
      }
    },
    fetch(manifestUrl: string, requestInit: RequestInit): Promise<Response> | void | false {
      return fetch(manifestUrl, {
        ...requestInit,
        credentials: 'include',
      });
    },
  };
}

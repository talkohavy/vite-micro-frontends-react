import { Federation, ModuleFederation, ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

export interface ModuleFederationRuntimeOptions {
  id?: string;
  name: string;
  version?: string;
  remotes: Array<any>; // <--- Remote;
  shared: any; // <--- ShareInfos;
  plugins: Array<ModuleFederationRuntimePlugin>;
  inBrowser: boolean;
}

export type InitOptions = {
  options: ModuleFederationRuntimeOptions;
  origin: ModuleFederation;
};

export type BeforeRequestOptions = {
  id: string;
  options: ModuleFederationRuntimeOptions;
  origin: ModuleFederation;
};

export type AfterResolveOptions = {
  id: string;
  pkgNameOrAlias: string;
  expose: string;
  remote: any; // <--- Remote
  options: ModuleFederationRuntimeOptions;
  origin: ModuleFederation;
  remoteInfo: any; // <--- RemoteInfo
  remoteSnapshot?: any; // <--- ModuleInfo
};

export type HandlePreloadModuleOptions = {
  id: string;
  name: string;
  remoteSnapshot: any; // <--- ModuleInfo
  preloadConfig: any; // <--- PreloadRemoteArgs
};

export type ErrorLoadRemoteOptions = {
  id: string;
  error: any; // <--- unknown;
  options?: any;
  from: 'build' | 'runtime';
  lifecycle: 'beforeRequest' | 'beforeLoadShare' | 'afterResolve' | 'onLoad';
  origin: ModuleFederation;
};

export type BeforeLoadShareOptions = {
  pkgName: string;
  shareInfo?: any; // <--- Shared;
  shared: any; // <--- Options['shared'];
  origin: ModuleFederation;
};

export type ResolveShareOptions = {
  shareScopeMap: any; // <--- ShareScopeMap
  scope: string;
  pkgName: string;
  version: string;
  GlobalFederation: Federation;
  resolver: () => any; // <--- () => Shared | undefined
};

export interface PreloadAssets {
  cssAssets: Array<string>;
  jsAssetsWithoutEntry: Array<string>;
  entryAssets: Array<any>; // <-- EntryAssets;
}

export type CreateScriptOptions = {
  url: string;
};

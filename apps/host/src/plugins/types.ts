import {
  Federation,
  Module,
  ModuleFederation,
  ModuleFederationRuntimePlugin,
} from '@module-federation/enhanced/runtime';
import { RemoteBundleTypeValues } from '../common/utils/useFederatedComponent/logic/constants';

interface RemoteInfo {
  name: string;
  version?: string;
  buildVersion?: string;
  entry: string;
  type: RemoteBundleTypeValues;
  entryGlobalName: string;
  shareScope: string;
}

type ModuleOptions = {
  remoteInfo: RemoteInfo;
  host: ModuleFederation;
};

export type BeforeInitOptions = {
  userOptions: any; // <--- UserOptions;
  options: ModuleFederationRuntimeOptions;
  origin: ModuleFederation;
  shareInfo: any; // <--- ShareInfos;
};

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

export type OnLoadOptions = {
  id: string;
  expose: string;
  pkgNameOrAlias: string;
  remote: any; // <--- Remote
  options: ModuleOptions;
  origin: ModuleFederation;
  exposeModule: any;
  exposeModuleFactory: any;
  moduleInstance: Module;
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

export type GeneratePreloadAssetsOptions = {
  origin: ModuleFederation;
  preloadOptions: any; // <-- PreloadOptions[number];
  remote: any; // <-- Remote;
  remoteInfo: RemoteInfo;
  remoteSnapshot: any; // <-- ModuleInfo;
  globalSnapshot: any; // <-- GlobalModuleInfo;
};

export interface PreloadAssets {
  cssAssets: Array<string>;
  jsAssetsWithoutEntry: Array<string>;
  entryAssets: Array<any>; // <-- EntryAssets;
}

export type CreateScriptOptions = {
  url: string;
};

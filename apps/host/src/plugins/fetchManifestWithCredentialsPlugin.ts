import { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

/**
 * This plugin is only applied when fetching the mf-manifest.json, not the remoteEntry.js
 */
export default function fetchManifestWithCredentialsPlugin(): ModuleFederationRuntimePlugin {
  return {
    name: 'fetch-manifest-with-credentials-plugin',
    fetch(manifestUrl: string, requestInit: RequestInit): Promise<Response> | void | false {
      return fetch(manifestUrl, {
        ...requestInit,
        credentials: 'include',
      });
    },
  };
}

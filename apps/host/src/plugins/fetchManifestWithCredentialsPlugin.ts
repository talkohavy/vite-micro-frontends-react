import { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

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

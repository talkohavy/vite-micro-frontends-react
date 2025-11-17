import type { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

/**
 * This plugin intercepts at the generatePreloadAssets stage - the earliest point
 * where we can modify asset URLs before they're used to create DOM elements.
 */
export default function dynamicallyAddBaseUrlPlugin(): ModuleFederationRuntimePlugin {
  return {
    name: 'dynamically-add-base-url-plugin',

    async generatePreloadAssets(args) {
      const { remoteInfo, remote } = args;

      console.log('addBaseUrlEarlyPlugin - generatePreloadAssets called:', {
        remoteName: remote.name,
        remoteInfo,
      });

      const baseUrl = extractOriginFromVersion(remoteInfo.version!);
      remoteInfo.entry = attachBaseUrlToRemoteEntryPath({ baseUrl, remoteEntryPath: remoteInfo.entry });

      return undefined as any;
    },
  };
}

/**
 * Version looks like this: "http://localhost:3001/mf-manifest.json"
 *
 * It could potentially include a slug url. We need to extract the base url from it.
 */
function extractOriginFromVersion(version: string): string {
  const url = new URL(version);
  return url.origin;
}

type AttachBaseUrlToRemoteEntryProps = {
  baseUrl: string;
  remoteEntryPath: string;
};

function attachBaseUrlToRemoteEntryPath(props: AttachBaseUrlToRemoteEntryProps): string {
  const { baseUrl, remoteEntryPath } = props;

  // If URL is already absolute, return as-is
  if (
    remoteEntryPath.startsWith('http://') ||
    remoteEntryPath.startsWith('https://') ||
    remoteEntryPath.startsWith('//')
  ) {
    return remoteEntryPath;
  }

  // If URL is relative, prepend base URL
  if (remoteEntryPath.startsWith('/')) {
    return `${baseUrl}${remoteEntryPath}`;
  }

  // If URL doesn't start with /, add both / and base URL
  return `${baseUrl}/${remoteEntryPath}`;
}

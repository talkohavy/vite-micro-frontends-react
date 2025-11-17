import type { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

// Hardcoded base URL - you can make this dynamic later
const BASE_URL = 'http://localhost:3001';

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

      remoteInfo.entry = attachBaseUrlToRemoteEntry(remoteInfo.entry);

      return undefined as any;
    },
  };
}

function attachBaseUrlToRemoteEntry(remoteEntryUrl: string): string {
  // If URL is already absolute, return as-is
  if (
    remoteEntryUrl.startsWith('http://') ||
    remoteEntryUrl.startsWith('https://') ||
    remoteEntryUrl.startsWith('//')
  ) {
    return remoteEntryUrl;
  }

  // If URL is relative, prepend base URL
  if (remoteEntryUrl.startsWith('/')) {
    return `${BASE_URL}${remoteEntryUrl}`;
  }

  // If URL doesn't start with /, add both / and base URL
  return `${BASE_URL}/${remoteEntryUrl}`;
}

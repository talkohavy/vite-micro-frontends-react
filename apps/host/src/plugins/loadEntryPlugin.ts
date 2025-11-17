import type { ModuleFederationRuntimePlugin } from '@module-federation/enhanced/runtime';

export default function loadEntryPlugin(): ModuleFederationRuntimePlugin {
  return {
    name: 'load-entry-plugin',
    loadEntry({ remoteInfo }) {
      if (remoteInfo.name === '@mf/books') {
        return {
          init(_shareScope: any, _initScope: any, _remoteEntryInitOPtions: any) {},
          async get(path: any) {
            const correctedPath = path.replace('./', '');
            console.log('correctedPath is:', correctedPath);

            const factory = await import('../Door.tsx');

            return () => factory.default;
          },
        };
      }
      return undefined as any;
    },
  };
}

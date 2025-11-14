import { registerRemotes } from '@module-federation/enhanced/runtime';
import { RemoteBundleType } from './logic/constants';
import useLoadedComponent from './logic/hooks/useLoadedComponent';

registerRemotes([
  // { name: 'mf_books', entry: 'http://localhost:3001/remoteEntry.js', type: RemoteBundleType.Module }, // <--- already defined at build
  { name: 'mf_dragons', entry: 'http://localhost:3002/remoteEntry.js', type: RemoteBundleType.Module },
  { name: 'mf_webpack', entry: 'http://localhost:3003/remoteEntry.js', type: RemoteBundleType.Commonjs },
]);

type UseFederatedComponentProps = {
  remoteName: string;
  remoteEntryUrl: string;
  moduleName: string;
};

export function useFederatedComponent(props: UseFederatedComponentProps) {
  const { remoteName, remoteEntryUrl, moduleName } = props ?? {};

  if (!(remoteName && moduleName && remoteEntryUrl)) {
    throw new Error('remoteName, moduleName, and remoteEntryUrl must be valid values at all times!');
  }

  const { Component } = useLoadedComponent({ remoteName, moduleName, remoteEntryUrl });

  return { Component };
}

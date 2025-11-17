import { registerRemotes } from '@module-federation/enhanced/runtime';
import { RemoteBundleTypes } from './logic/constants';
import useLoadedComponent from './logic/hooks/useLoadedComponent';

registerRemotes([
  { name: '@mf/dragons', entry: 'http://localhost:3002/mf-manifest.json', type: RemoteBundleTypes.Module },
  { name: 'mf_webpack', entry: 'http://localhost:3003/mf-manifest.json', type: RemoteBundleTypes.Commonjs },
]);

type UseFederatedComponentProps = {
  remoteName: string;
  moduleName: string;
};

export function useFederatedComponent(props: UseFederatedComponentProps) {
  const { remoteName, moduleName } = props ?? {};

  if (!(remoteName && moduleName)) {
    throw new Error('remoteName, moduleName, and remoteEntryUrl must be valid values at all times!');
  }

  const { Component } = useLoadedComponent({ remoteName, moduleName });

  return { Component };
}

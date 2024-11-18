import { RemoteBundleType } from './logic/constants';
import useSanityCheck from './logic/hooks/useSanityCheck';
import useInitMicroFrontend from './logic/hooks/useInitMicroFrontend';
import useLoadedComponent from './logic/hooks/useLoadedComponent';

type UseFederatedComponentProps = {
  remoteName: string;
  remoteEntryUrl: string;
  moduleName: string;
  type: RemoteBundleType;
};

export function useFederatedComponent(props: UseFederatedComponentProps) {
  const { remoteName, remoteEntryUrl, moduleName, type } = props ?? {};

  useSanityCheck({ remoteName, moduleName, remoteEntryUrl }); // <--- MUST come before useInitMicroFrontend & useLoadedComponent

  useInitMicroFrontend({ remoteName, remoteEntryUrl, type }); // <--- not must, but should come before useLoadedComponent

  const { Component } = useLoadedComponent({ remoteName, moduleName, remoteEntryUrl });

  return { Component };
}

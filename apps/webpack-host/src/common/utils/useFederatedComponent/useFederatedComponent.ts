import { RemoteBundleTypeValues } from './logic/constants';
import useInitMicroFrontend from './logic/hooks/useInitMicroFrontend';
import useLoadedComponent from './logic/hooks/useLoadedComponent';
import useSanityCheck from './logic/hooks/useSanityCheck';

type UseFederatedComponentProps = {
  remoteName: string;
  remoteEntryUrl: string;
  moduleName: string;
  type: RemoteBundleTypeValues;
};

export function useFederatedComponent(props: UseFederatedComponentProps) {
  const { remoteName, remoteEntryUrl, moduleName, type } = props ?? {};

  useSanityCheck({ remoteName, moduleName, remoteEntryUrl }); // <--- MUST come before useInitMicroFrontend & useLoadedComponent

  useInitMicroFrontend({ remoteName, remoteEntryUrl, type }); // <--- not must, but should come before useLoadedComponent

  const { Component } = useLoadedComponent({ remoteName, moduleName, remoteEntryUrl });

  return { Component };
}

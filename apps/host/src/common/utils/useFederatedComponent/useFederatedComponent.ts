import useLoadedComponent from './logic/hooks/useLoadedComponent';

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

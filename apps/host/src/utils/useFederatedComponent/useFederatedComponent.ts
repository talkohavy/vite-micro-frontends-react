import { ComponentType, lazy, useEffect, useState } from 'react';
import { useDynamicScript } from './useDynamicScript';
import { loadComponent } from './loadComponent';

const componentCache = new Map();

type UseFederatedComponentProps = {
  remoteUrl: string;
  scope: string;
  module: string;
};

export function useFederatedComponent(props: UseFederatedComponentProps) {
  const { remoteUrl, scope, module } = props;

  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = useState<ComponentType<any>>({} as ComponentType<any>);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);

  useEffect(() => {
    if (Component) setComponent(null as unknown as ComponentType<any>);
    // Only recalculate when key changes
  }, [key, Component]);

  useEffect(() => {
    if (ready && !Component) {
      const LoadedComponent = lazy(loadComponent(scope, module));
      componentCache.set(key, LoadedComponent);
      setComponent(LoadedComponent);
    }
    // `key` already includes all dependencies (scope/module)
    // eslint-disable-next-line
  }, [Component, ready, key]);

  return { errorLoading, Component };
}

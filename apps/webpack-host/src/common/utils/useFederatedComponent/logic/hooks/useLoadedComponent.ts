import { lazy, LazyExoticComponent, useEffect, useState } from 'react';
import { FederatedModule } from '../../types';
import { componentsCache } from '../constants';
import { loadComponent } from '../utils/loadComponent';

type useLoadedComponentProps = {
  remoteName: string;
  remoteEntryUrl: string;
  moduleName: string;
};

export default function useLoadedComponent(props: useLoadedComponentProps) {
  const { remoteName, moduleName, remoteEntryUrl } = props;

  const [Component, setComponent] = useState<LazyExoticComponent<FederatedModule> | null>(null);

  useEffect(() => {
    if (Component) return;

    const federatedComponentKey = `${remoteName}-${remoteEntryUrl}-${moduleName}`;

    const cachedComponent = componentsCache.get(federatedComponentKey);

    if (cachedComponent) return setComponent(cachedComponent);

    const federatedComponent = lazy(loadComponent({ remoteName, moduleName }));

    componentsCache.set(federatedComponentKey, federatedComponent);

    setComponent(federatedComponent);

    return () => setComponent(null);
    // Do not add Component as a dependency!
  }, [remoteName, moduleName, remoteEntryUrl]);

  return { Component };
}

import { loadRemote } from '@module-federation/enhanced/runtime';
import { FederatedModuleInDefault } from '../../types';

type LoadComponentProps = {
  remoteName: string;
  moduleName: string;
};

export function loadComponent(props: LoadComponentProps) {
  const { remoteName, moduleName } = props;

  return async () => {
    // NOTE! Before coming here, a matching `init` MUST have been called at least once.
    const remoteUrl = `${remoteName}/${moduleName}`;

    const Module = (await loadRemote(remoteUrl)) as FederatedModuleInDefault;

    return Module;
  };
}

import { ComponentType } from 'react';
import { loadRemote } from '@module-federation/runtime';

export function loadComponent(scope: string, module: string) {
  return async () => {
    debugger;
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    const remoteUrl = `${scope}/${module.slice(2)}`;

    const Module = (await loadRemote(remoteUrl)) as { default: ComponentType<any> };
    return Module;
  };
}

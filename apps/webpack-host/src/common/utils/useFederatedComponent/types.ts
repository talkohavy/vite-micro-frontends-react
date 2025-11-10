import { ComponentType } from 'react';

export type FederatedModule = ComponentType<any>;

export type FederatedModuleInDefault = {
  default: FederatedModule;
};

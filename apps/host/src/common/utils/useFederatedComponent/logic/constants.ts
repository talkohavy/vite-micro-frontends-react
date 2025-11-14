import { LazyExoticComponent } from 'react';
import { FederatedModule } from '../types';

export const componentsCache = new Map<string, LazyExoticComponent<FederatedModule>>();

export enum RemoteBundleType {
  Module = 'module',
  Commonjs = 'var',
}

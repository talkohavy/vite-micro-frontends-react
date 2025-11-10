import { LazyExoticComponent } from 'react';
import { FederatedModule } from '../types';

export const componentsCache = new Map<string, LazyExoticComponent<FederatedModule>>();
export const initedMicroFrontendsCache = new Map<string, boolean>();

export enum RemoteBundleType {
  Module = 'module',
  Commonjs = 'var',
}

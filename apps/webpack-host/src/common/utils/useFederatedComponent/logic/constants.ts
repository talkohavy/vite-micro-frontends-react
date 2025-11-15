import { LazyExoticComponent } from 'react';
import { FederatedModule } from '../types';

export const componentsCache = new Map<string, LazyExoticComponent<FederatedModule>>();
export const initedMicroFrontendsCache = new Map<string, boolean>();

export const RemoteBundleTypes = {
  Module: 'module',
  Commonjs: 'var',
} as const;

export type RemoteBundleTypeValues = (typeof RemoteBundleTypes)[keyof typeof RemoteBundleTypes];

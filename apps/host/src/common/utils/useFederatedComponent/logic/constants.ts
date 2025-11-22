import { LazyExoticComponent } from 'react';
import { FederatedModule } from '../types';

export const componentsCache = new Map<string, LazyExoticComponent<FederatedModule>>();

export const RemoteBundleTypes = {
  Module: 'module',
  Commonjs: 'var', // <--- 'var' is the same as 'commonjs'
} as const;

export type RemoteBundleTypeValues = (typeof RemoteBundleTypes)[keyof typeof RemoteBundleTypes];

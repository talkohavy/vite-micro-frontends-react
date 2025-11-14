import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import { RemoteBundleType } from '@src/common/utils/useFederatedComponent/logic/constants';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function DragonsMF() {
  const { Component } = useFederatedComponent({
    remoteName: '@mf/dragons',
    moduleName: 'App',
    remoteEntryUrl: 'http://localhost:3002/remoteEntry.js',
    type: RemoteBundleType.Module,
  });

  if (!Component) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading dragons...'>
        <Component />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import { RemoteBundleType } from '@src/common/utils/useFederatedComponent/logic/constants';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function BooksMF() {
  const { Component } = useFederatedComponent({
    remoteName: '@mf/books',
    moduleName: 'App',
    remoteEntryUrl: 'http://localhost:3001/remoteEntry.js',
    type: RemoteBundleType.Module,
  });

  if (!Component) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading books...'>
        <Component />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

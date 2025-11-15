import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function WebpackMF() {
  const { Component } = useFederatedComponent({
    remoteName: 'mf_webpack',
    moduleName: 'App',
  });

  if (!Component) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading webpack MF...'>
        <Component />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

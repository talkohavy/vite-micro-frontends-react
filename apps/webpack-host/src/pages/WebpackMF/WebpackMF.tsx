import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function WebpackMF() {
  const { Component: Webpack } = useFederatedComponent({
    remoteName: 'mf_webpack',
    moduleName: 'App',
  });

  if (!Webpack) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading webpack MF...'>
        <Webpack />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

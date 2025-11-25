import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function RsBuildPage() {
  const { Component: RsBuildMF } = useFederatedComponent({
    remoteName: 'mf_rsbuild',
    moduleName: 'App',
  });

  if (!RsBuildMF) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading rsbuild MF...'>
        <RsBuildMF />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

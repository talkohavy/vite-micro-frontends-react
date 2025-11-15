import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function DragonsMF() {
  const { Component: Dragons } = useFederatedComponent({
    remoteName: '@mf/dragons',
    moduleName: 'App',
  });

  if (!Dragons) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading dragons...'>
        <Dragons />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function BooksMF() {
  const { Component: Books } = useFederatedComponent({
    remoteName: '@mf/books',
    moduleName: 'App',
  });

  if (!Books) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading books...'>
        <Books />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

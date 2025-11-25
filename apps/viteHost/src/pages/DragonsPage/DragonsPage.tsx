import { Suspense } from 'react';
import { useFederatedComponent } from '@src/common/utils/useFederatedComponent';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

export default function DragonsPage() {
  const { Component: DragonsMF } = useFederatedComponent({
    remoteName: '@mf/dragons',
    moduleName: 'App',
  });

  if (!DragonsMF) return null;

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback='Loading dragons...'>
        <DragonsMF />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

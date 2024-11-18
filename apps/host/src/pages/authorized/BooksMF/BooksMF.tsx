import { lazy, Suspense } from 'react';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

const RemoteApp = lazy(() => import('@mf-books/A1pp'));

export default function BooksMF() {
  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <RemoteApp />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

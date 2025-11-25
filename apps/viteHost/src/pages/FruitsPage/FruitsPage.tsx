import { lazy, Suspense } from 'react';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

const FruitsMF = lazy(() => import('@mf/fruits/App'));

export default function FruitsPage() {
  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <FruitsMF />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

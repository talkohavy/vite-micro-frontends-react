import { lazy, Suspense } from 'react';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';

const BooksMF = lazy(() => import('@mf/books/App'));

export default function BooksPage() {
  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <BooksMF />
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

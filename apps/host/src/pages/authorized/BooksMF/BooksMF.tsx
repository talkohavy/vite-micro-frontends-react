import { lazy, Suspense } from 'react';

const RemoteApp = lazy(() => import('@mf-books/App'));

export default function BooksMF() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <RemoteApp />
    </Suspense>
  );
}

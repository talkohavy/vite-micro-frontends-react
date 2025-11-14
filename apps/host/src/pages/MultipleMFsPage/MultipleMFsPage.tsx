import { lazy, Suspense } from 'react';
import MicroFrontendErrorBoundary from '@src/components/ErrorBoundaries/MicroFrontendErrorBoundary';
import { useFederatedComponent } from '../../common/utils/useFederatedComponent';
import styles from './MultipleMFsPage.module.scss';

const BooksMF = lazy(() => import('@mf/books/App'));
const FruitsMF = lazy(() => import('@mf/fruits/App'));

export default function MultipleMFs() {
  const { Component: DragonsMF } = useFederatedComponent({
    remoteName: '@mf/dragons',
    moduleName: 'App',
    remoteEntryUrl: 'http://localhost:3002/mf-manifest.json',
  });

  return (
    <MicroFrontendErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <div className={styles.mfsWrapper}>
          <div className={styles.card}>
            <h2>Books Host</h2>
            <BooksMF />
          </div>

          <div className={styles.card}>
            <h2>Fruits Host</h2>
            <FruitsMF />
          </div>

          <div className={styles.card}>
            <h2>Dragons Host</h2>
            {DragonsMF && <DragonsMF />}
          </div>
        </div>
      </Suspense>
    </MicroFrontendErrorBoundary>
  );
}

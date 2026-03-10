import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useFixPathnameWithAsterisk } from './hooks/useFixPathnameWithAsterisk';
import { routes } from './routes';

const PageNotFound = lazy(() => import('./pages/PageNotFound'));

export default function App() {
  useFixPathnameWithAsterisk();

  return (
    <Layout>
      <Suspense>
        <Routes>
          {routes.map(({ to: path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

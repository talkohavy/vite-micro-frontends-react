import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { routes } from './routes';

const PageNotFound = lazy(() => import('./pages/PageNotFound'));

export default function App() {
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

import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { authorizedRoutes } from './routes';

const PageNotFound = lazy(() => import('./pages/unauthorized/PageNotFound'));

export default function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          {authorizedRoutes.map(({ to: path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

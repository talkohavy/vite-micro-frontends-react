import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import MicroFrontendErrorBoundary from './components/ErrorBoundaries/MicroFrontendErrorBoundary';
import Layout from './components/Layout';
import Redirect from './components/Redirect';
import { authorizedRoutes, unauthorizedRoutes } from './routes';
import { State } from './store';

const PageNotFound = lazy(() => import('./pages/unauthorized/PageNotFound'));

export default function App() {
  const { isLogged: isAuthorized } = useSelector((state: State) => state.user);

  if (isAuthorized)
    return (
      <Layout>
        <Suspense>
          <MicroFrontendErrorBoundary>
            <Routes>
              {authorizedRoutes.map(({ to: path, Component }, index) => (
                <Route key={index} path={path} element={<Component />} />
              ))}

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </MicroFrontendErrorBoundary>
        </Suspense>
      </Layout>
    );

  return (
    <Suspense>
      <Routes>
        {unauthorizedRoutes.map(({ to: path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}

        <Route path='*' element={<Redirect />} />
      </Routes>
    </Suspense>
  );
}

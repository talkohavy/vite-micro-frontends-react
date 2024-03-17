import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import MicroFrontendErrorBoundary from './components/ErrorBoundaries/MicroFrontendErrorBoundary';
import Layout from './components/Layout';
import Redirect from './components/Redirect';

/** @typedef {import('./store/types').State} State */

const Login = lazy(() => import('./pages/unauthorized/Login'));
const HomePage = lazy(() => import('./pages/authorized/Home'));
const BooksPage = lazy(() => import('./pages/authorized/Books'));
const PageNotFound = lazy(() => import('./pages/unauthorized/PageNotFound'));

export default function App() {
  const { isLogged: isAuthorized } = useSelector(
    /** @param {State} state */
    (state) => state.user,
  );

  if (isAuthorized)
    return (
      <Layout>
        <Suspense>
          <MicroFrontendErrorBoundary>
            <Routes>
              <Route path='/index.html' element={<HomePage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/books' element={<BooksPage />} />
              {/* <Route path='/list/:id' element={<SinlgeItemPage />} /> */}

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </MicroFrontendErrorBoundary>
        </Suspense>
      </Layout>
    );

  return (
    <Suspense>
      <Routes>
        <Route path='/index.html' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        <Route path='*' element={<Redirect />} />
      </Routes>
    </Suspense>
  );
}

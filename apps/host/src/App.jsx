import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/Home'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

export default function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          <Route path='/index.html' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          {/* <Route path='/list' element={<ListPage />} /> */}
          {/* <Route path='/list/:id' element={<SinlgeItemPage />} /> */}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

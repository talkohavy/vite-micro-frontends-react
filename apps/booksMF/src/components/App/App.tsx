import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { Route as RouteType } from '../../common/types';
import { routes } from '../../routes';
import Layout from '../Layout';

function renderRoute(route: RouteType, index: number) {
  const { to: path, Component, children } = route;

  if (children && children.length > 0) {
    return (
      <Route key={index} path={path} element={<Component />}>
        {children.map((childRoute, childIndex) => renderRoute(childRoute, childIndex))}
      </Route>
    );
  }

  // Simple route without children
  return <Route key={index} path={path} element={<Component />} />;
}

export default function App() {
  return (
    <Layout>
      <Suspense>
        <Routes>
          {routes.map((route, index) => renderRoute(route, index))}
          <Route path='*' element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

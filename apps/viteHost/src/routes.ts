import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import { Route } from './common/types';
import RedirectToHome from './pages/RedirectToHome';

const HomePage = lazy(() => import('./pages/HomePage'));
const BooksPage = lazy(() => import('./pages/BooksPage'));
const FruitsPage = lazy(() => import('./pages/FruitsPage'));
const DragonsPage = lazy(() => import('./pages/DragonsPage'));
const WebpackMF = lazy(() => import('./pages/WebpackMF'));
const RsBuildPage = lazy(() => import('./pages/RsBuildPage'));
const MultipleMFsPage = lazy(() => import('./pages/MultipleMFsPage'));

export const routes: Array<Route> = [
  {
    to: '/',
    hideFromSidebar: true,
    Component: RedirectToHome,
  } as Route,
  {
    to: `${BASE_URL}/`,
    text: 'Home',
    activeNames: [`${BASE_URL}/home`, `${BASE_URL}/`],
    Component: HomePage,
  },
  {
    to: `${BASE_URL}/books/*`,
    text: 'Books',
    activeNames: [`${BASE_URL}/books`],
    Component: BooksPage,
  },
  {
    to: `${BASE_URL}/fruits`,
    text: 'Fruits',
    activeNames: [`${BASE_URL}/fruits`],
    Component: FruitsPage,
  },
  {
    to: `${BASE_URL}/dragons`,
    text: 'Dragons',
    activeNames: [`${BASE_URL}/dragons`],
    Component: DragonsPage,
  },
  {
    to: `${BASE_URL}/rsbuild`,
    text: 'Rsbuild',
    activeNames: [`${BASE_URL}/rsbuild`],
    Component: RsBuildPage,
  },
  {
    to: `${BASE_URL}/webpack`,
    text: 'Webpack MF',
    activeNames: [`${BASE_URL}/webpack`],
    Component: WebpackMF,
  },
  {
    to: `${BASE_URL}/multiple`,
    text: 'Multiple MF',
    activeNames: [`${BASE_URL}/multiple`],
    Component: MultipleMFsPage,
  },
];

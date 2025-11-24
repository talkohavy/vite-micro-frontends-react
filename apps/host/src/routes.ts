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
    activeNames: ['/home', '/'],
    Component: HomePage,
  },
  {
    to: `${BASE_URL}/books`,
    text: 'Books',
    activeNames: ['/books'],
    Component: BooksPage,
  },
  {
    to: `${BASE_URL}/fruits`,
    text: 'Fruits',
    activeNames: ['/fruits'],
    Component: FruitsPage,
  },
  {
    to: `${BASE_URL}/dragons`,
    text: 'Dragons',
    activeNames: ['/dragons'],
    Component: DragonsPage,
  },
  {
    to: `${BASE_URL}/rsbuild`,
    text: 'Rsbuild',
    activeNames: ['/rsbuild'],
    Component: RsBuildPage,
  },
  {
    to: `${BASE_URL}/webpack`,
    text: 'Webpack MF',
    activeNames: ['/webpack'],
    Component: WebpackMF,
  },
  {
    to: `${BASE_URL}/multiple`,
    text: 'Multiple MF',
    activeNames: ['/multiple'],
    Component: MultipleMFsPage,
  },
];

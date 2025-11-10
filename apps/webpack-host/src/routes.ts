import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import { Route } from './common/types';
import RedirectToHome from './pages/RedirectToHome';

const HomePage = lazy(() => import('./pages/HomePage'));
const BooksMF = lazy(() => import('./pages/BooksMF'));
const DragonsMF = lazy(() => import('./pages/DragonsMF'));
const WebpackMF = lazy(() => import('./pages/WebpackMF'));

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
    Component: BooksMF,
  },
  {
    to: `${BASE_URL}/dragons`,
    text: 'Dragons',
    activeNames: ['/dragons'],
    Component: DragonsMF,
  },
  {
    to: `${BASE_URL}/webpack`,
    text: 'Webpack MF',
    activeNames: ['/webpack'],
    Component: WebpackMF,
  },
];

import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import { Route } from './common/types';
import RedirectToHome from './pages/RedirectToHome';

const HomePage = lazy(() => import('./pages/HomePage'));

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
];

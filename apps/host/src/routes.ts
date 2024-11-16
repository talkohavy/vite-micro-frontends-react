import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/authorized/HomePage'));
const BooksPage = lazy(() => import('./pages/authorized/BooksPage'));
const DynamicMF = lazy(() => import('./pages/authorized/DynamicMF'));
const LoginPage = lazy(() => import('./pages/unauthorized/Login'));

export const authorizedRoutes = [
  {
    to: '/',
    text: 'Home',
    activeNames: ['/home', '/'],
    Component: HomePage,
  },
  {
    to: '/books',
    text: 'Books',
    activeNames: ['/books'],
    Component: BooksPage,
  },
  {
    to: '/dynamic',
    text: 'Dynamic',
    activeNames: ['/dynamic'],
    Component: DynamicMF,
  },
];

export const unauthorizedRoutes = [
  {
    to: '/',
    text: 'login',
    activeNames: ['/login', '/'],
    Component: LoginPage,
  },
];

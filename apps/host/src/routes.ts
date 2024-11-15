import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/authorized/HomePage'));
const BooksPage = lazy(() => import('./pages/authorized/BooksPage'));
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
];

export const unauthorizedRoutes = [
  {
    to: '/',
    text: 'login',
    activeNames: ['/login', '/'],
    Component: LoginPage,
  },
];

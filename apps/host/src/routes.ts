import { lazy } from 'react';

const BooksMF = lazy(() => import('./pages/authorized/BooksMF'));

export const authorizedRoutes = [
  {
    to: '/',
    text: 'Home',
    activeNames: ['/home', '/'],
    Component: BooksMF,
  },
];

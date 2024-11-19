import { lazy } from 'react';

const BooksMF = lazy(() => import('./pages/authorized/BooksMF'));
const DragonsMF = lazy(() => import('./pages/authorized/DragonsMF'));
const LoginPage = lazy(() => import('./pages/unauthorized/Login'));

export const authorizedRoutes = [
  {
    to: '/',
    text: 'Home',
    activeNames: ['/home', '/'],
    Component: BooksMF,
  },
  {
    to: '/dragons',
    text: 'Dragons',
    activeNames: ['/dragons'],
    Component: DragonsMF,
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

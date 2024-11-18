import { lazy } from 'react';

const HomePage = lazy(() => import('./pages/authorized/HomePage'));
const BooksMF = lazy(() => import('./pages/authorized/BooksMF'));
const DragonsMF = lazy(() => import('./pages/authorized/DragonsMF'));
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

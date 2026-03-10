import { lazy } from 'react';
import { BOOKS_BASE_URL } from './common/constants';
import { Route } from './common/types';

const Page1 = lazy(() => import('./pages/Page1'));
const Page2 = lazy(() => import('./pages/Page2'));

// Page 2 tabs:
const Tab1 = lazy(() => import('./pages/Page2/tabs/Tab1'));
const Tab2 = lazy(() => import('./pages/Page2/tabs/Tab2'));
const Tab3 = lazy(() => import('./pages/Page2/tabs/Tab3'));

export const routes: Array<Route> = [
  {
    to: `${BOOKS_BASE_URL}/`,
    text: 'Page 1',
    activeNames: [`${BOOKS_BASE_URL}/`, `${BOOKS_BASE_URL}`],
    Component: Page1,
  },
  {
    to: `${BOOKS_BASE_URL}/page-2`,
    text: 'Page 2',
    activeNames: [`${BOOKS_BASE_URL}/page-2`],
    Component: Page2,
    children: [
      {
        to: '',
        text: 'Tab 1',
        activeNames: [`${BOOKS_BASE_URL}/page-2`],
        Component: Tab1,
      },
      {
        to: 'tab-2',
        text: 'Tab 2',
        activeNames: [`${BOOKS_BASE_URL}/page-2/tab-2`],
        Component: Tab2,
      },
      {
        to: 'tab-3',
        text: 'Tab 3',
        activeNames: [`${BOOKS_BASE_URL}/page-2/tab-3`],
        Component: Tab3,
      },
    ],
  },
];

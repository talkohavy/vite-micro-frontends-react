import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import { Route } from './common/types';

const Page1 = lazy(() => import('./pages/Page1'));
const Page2 = lazy(() => import('./pages/Page2'));

// Page 2 tabs:
const Tab1 = lazy(() => import('./pages/Page2/tabs/Tab1'));
const Tab2 = lazy(() => import('./pages/Page2/tabs/Tab2'));

export const routes: Array<Route> = [
  {
    to: `${BASE_URL}/`,
    text: 'Page 1',
    activeNames: ['/page-1', '/'],
    Component: Page1,
  },
  {
    to: `${BASE_URL}/page-2`,
    text: 'Page 2',
    activeNames: [`${BASE_URL}/page-2`],
    Component: Page2,
    children: [
      {
        to: '',
        text: 'Tab 1',
        activeNames: [],
        Component: Tab1,
      },
      {
        to: 'tab-2',
        text: 'Tab 2',
        activeNames: [],
        Component: Tab2,
      },
    ],
  },
];

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import App from './App';
import GlobalErrorBoundaryDevelopment from './components/ErrorBoundaries/GlobalErrorBoundaryDevelopment';
import ReactErrorOverlay from './components/ReactErrorOverlay';
import DarkThemeProvider from './providers/DarkThemeProvider';
import { configureMyStore } from './store';
import './index.css';

/** @typedef {import('./store/types').State} State */

const isLogged = !!localStorage.getItem('isLogged');

/** @type {Partial<State>} */
const preloadedState = { user: { isLogged } };

const { store, history } = configureMyStore({ preloadedState });

function Client() {
  return (
    <React.StrictMode>
      <GlobalErrorBoundaryDevelopment>
        <Provider store={store}>
          <HistoryRouter history={history}>
            <DarkThemeProvider>
              <App />
            </DarkThemeProvider>
          </HistoryRouter>
        </Provider>
      </GlobalErrorBoundaryDevelopment>
    </React.StrictMode>
  );
}

/** @type {any} */
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<Client />);

window.addEventListener('error', ({ error }) => ReactErrorOverlay(error));
window.addEventListener('unhandledrejection', ({ reason }) => ReactErrorOverlay(reason));

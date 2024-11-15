import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter } from 'redux-first-history/rr6';
import App from './App';
import GlobalErrorBoundaryDevelopment from './components/ErrorBoundaries/GlobalErrorBoundaryDevelopment';
import ReactErrorOverlay from './components/ReactErrorOverlay';
import SuspenseUntilReady from './components/SuspenseUntilReady';
import DarkThemeProvider from './providers/DarkThemeProvider';
import { configureMyStore } from './store';
import { State } from './store/types';
import './index.css';

const isLogged = !!localStorage.getItem('isLogged');

const preloadedState = { user: { isLogged } } as State;

const { store, history } = configureMyStore({ preloadedState });

function Client() {
  return (
    <React.StrictMode>
      <SuspenseUntilReady
        asyncFn={async () => {
          console.log('Application is up and running!');
        }}
      >
        <GlobalErrorBoundaryDevelopment>
          <Provider store={store}>
            <HistoryRouter history={history}>
              <DarkThemeProvider>
                <App />
              </DarkThemeProvider>
            </HistoryRouter>
          </Provider>
        </GlobalErrorBoundaryDevelopment>
      </SuspenseUntilReady>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<Client />);

window.addEventListener('error', ({ error }) => ReactErrorOverlay(error));
window.addEventListener('unhandledrejection', ({ reason }) => ReactErrorOverlay(reason));

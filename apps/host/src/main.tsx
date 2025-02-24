import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalErrorBoundaryDevelopment from './components/ErrorBoundaries/GlobalErrorBoundaryDevelopment';
import ReactErrorOverlay from './components/ReactErrorOverlay';
import SuspenseUntilReady from './components/SuspenseUntilReady';
import DarkThemeProvider from './providers/DarkThemeProvider';
import { createStore } from './store';
import { State } from './store';
import './index.css';
import './common/styles/lightTheme.css';
import './common/styles/darkTheme.css';

// const isLogged = !!localStorage.getItem('isLogged');
const isLogged = true;

const preloadedState = { user: { isLogged } } as State;

const store = createStore(preloadedState);

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
            <BrowserRouter>
              <DarkThemeProvider>
                <App />
              </DarkThemeProvider>
            </BrowserRouter>
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

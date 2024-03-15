import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorBoundaryModal from './components/ErrorBoundaryModal';
import ReactErrorOverlay from './components/ReactErrorOverlay';
import DarkThemeProvider from './providers/DarkThemeProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorBoundaryModal}>
      <BrowserRouter>
        <DarkThemeProvider>
          <App />
        </DarkThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);

window.addEventListener('error', ({ error }) => ReactErrorOverlay(error));
window.addEventListener('unhandledrejection', ({ reason }) => ReactErrorOverlay(reason));

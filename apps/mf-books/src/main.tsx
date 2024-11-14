import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

function Client() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<Client />);

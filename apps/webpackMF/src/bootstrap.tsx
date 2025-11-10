import React from 'react';
import ReactDOM from 'react-dom/client';
import StandaloneWebpackMF from './standalone/StandaloneWebpackMF';
import './index.css';

function Client() {
  return (
    <React.StrictMode>
      <StandaloneWebpackMF />
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<Client />);

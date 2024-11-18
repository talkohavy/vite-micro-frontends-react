import React from 'react';
import ReactDOM from 'react-dom/client';
import ExposedDragonsMF from '../exposes/ExposedDragonsMF';
import '../index.css';

function StandaloneClient() {
  return (
    <React.StrictMode>
      <ExposedDragonsMF />
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<StandaloneClient />);

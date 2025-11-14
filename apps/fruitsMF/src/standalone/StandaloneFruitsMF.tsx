import React from 'react';
import ReactDOM from 'react-dom/client';
import ExposedBooksMF from '../exposes/ExposedFruitsMF';
import './index.css';

function Client() {
  return (
    <React.StrictMode>
      <ExposedBooksMF />
    </React.StrictMode>
  );
}

const rootElement = document.getElementById('root') as HTMLDivElement;
const root = ReactDOM.createRoot(rootElement);
root.render(<Client />);

import { useState } from 'react';
import './Button.css';

export default function Button() {
  const [state, setState] = useState(0);
  return (
    <div>
      <button id='click-btn' className='shared-btn' onClick={() => setState((s) => s + 1)}>
        Click me: {state}
      </button>
    </div>
  );
}

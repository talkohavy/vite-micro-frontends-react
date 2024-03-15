import { useState } from 'react';
import './Button.css';

export default function Button() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type='button' className='shared-btn' onClick={() => setCount((s) => s + 1)}>
        Click counter: {count}
      </button>
    </div>
  );
}

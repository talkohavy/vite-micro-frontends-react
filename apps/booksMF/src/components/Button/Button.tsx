import { useState } from 'react';
import styles from './Button.module.css';

export default function Button() {
  const [state, setState] = useState(0);

  return (
    <div>
      <button id='click-btn' className={styles.sharedBtn} onClick={() => setState((s) => s + 1)}>
        Click me: {state}
      </button>
    </div>
  );
}

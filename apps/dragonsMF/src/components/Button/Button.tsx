import styles from './Button.module.css';

import { useState } from 'react';

export default function Button() {
  const [state, setState] = useState(0);

  return (
    <button id='click-btn' className={styles.dragonButton} onClick={() => setState((s) => s + 1)}>
      Click me: {state}
    </button>
  );
}

import { useState } from 'react';
import styles from './Button.module.css';

export default function Button() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type='button' className={styles.sharedBtn} onClick={() => setCount((s) => s + 1)}>
        Click counter: {count}
      </button>
    </div>
  );
}

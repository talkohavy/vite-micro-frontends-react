import clsx from 'clsx';
import { ReactComponent as ReactLogo } from '../../assets/react.svg';
import Button from '../Button';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.icons}>
        <img src='/vite.svg' className='logo' alt='Vite logo' />

        <ReactLogo className={clsx(styles.logo, styles.react)} />
      </div>

      <h1 className={styles.title}>Vite + React</h1>

      <div className={styles.card}>
        <Button />

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

import clsx from 'clsx';
import { ReactComponent as Cherry } from '../../assets/cherry.svg';
import { ReactComponent as Grapes } from '../../assets/grapes.svg';
import { ReactComponent as Strawberry } from '../../assets/strawberry.svg';
import { ReactComponent as Watermelon } from '../../assets/watermelon.svg';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.icons}>
        <img src='/vite.svg' className='logo' alt='Vite logo' />

        <Cherry className={clsx(styles.logo, styles.react)} />
        <Grapes className={clsx(styles.logo, styles.react)} />
        <Strawberry className={clsx(styles.logo, styles.react)} />
        <Watermelon className={clsx(styles.logo, styles.react)} />
      </div>

      <h1 className={styles.title}>Welcome from Fruits!</h1>
    </div>
  );
}

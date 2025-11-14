import { ReactComponent as Cherry } from '../../assets/cherry.svg';
import { ReactComponent as Grapes } from '../../assets/grapes.svg';
import { ReactComponent as Strawberry } from '../../assets/strawberry.svg';
import { ReactComponent as Watermelon } from '../../assets/watermelon.svg';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <div className={styles.icons}>
        <Cherry className={styles.logo} />
        <Grapes className={styles.logo} />
        <Strawberry className={styles.logo} />
        <Watermelon className={styles.logo} />
      </div>

      <h1 className={styles.title}>Welcome from Fruits!</h1>
    </div>
  );
}

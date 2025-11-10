import { ReactComponent as ViteIcon } from '../../../assets/vite2.svg';
import DarkModeToggle from './DarkModeToggle';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <ViteIcon />

      <DarkModeToggle />
    </header>
  );
}

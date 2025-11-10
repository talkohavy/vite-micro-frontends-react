import clsx from 'clsx';
import Button from '../Button';
import styles from './App.module.scss';

type AppProps = {
  className?: string;
};

export default function App(props: AppProps) {
  const { className } = props;

  return (
    <div className={clsx(styles.app, className)}>
      <div className={styles.dragon}>I am a Dragon12</div>

      <Button />
    </div>
  );
}

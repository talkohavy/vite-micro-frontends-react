import Button from '../Button';
import styles from './App.module.scss';

type AppProps = {
  className?: string;
};

export default function App(props: AppProps) {
  const { className } = props;

  return (
    <div className={className}>
      <div className={styles.dragon}>I am a Dragon</div>

      <Button />
    </div>
  );
}

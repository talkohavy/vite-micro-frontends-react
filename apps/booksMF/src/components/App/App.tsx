import clsx from 'clsx';
import { ReactComponent as ReactLogo } from '../../assets/react.svg';
import Button from '../Button';
import styles from './App.module.css';

type AppProps = {
  className?: string;
};

export default function App(props: AppProps) {
  const { className } = props;

  return (
    <div className='App'>
      <div className={className}>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <ReactLogo className={clsx(styles.logo, styles.react)} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <Button />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

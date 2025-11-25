import { PropsWithChildren } from 'react';
import styles from './Main.module.scss';

export default function Main(props: PropsWithChildren) {
  const { children } = props;

  return <main className={styles.main}>{children}</main>;
}

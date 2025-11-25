import { PropsWithChildren } from 'react';
import Header from './Header';
import styles from './Layout.module.scss';
import Main from './Main';
import Sidebar from './Sidebar';

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <div className={styles.layout}>
      <Header />

      <div className={styles.mainAndSideBar}>
        <Sidebar />

        <Main>{children}</Main>
      </div>
    </div>
  );
}

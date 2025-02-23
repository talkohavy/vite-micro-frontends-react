import { useState } from 'react';
import clsx from 'clsx';
import DownArrow from '../../svgs/DownArrow';
import styles from './SideBar.module.scss';
import SideBarLinkList from './SideBarLinkList';

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className={clsx(styles.sidebar, isSidebarOpen && styles.sidebarOpen)}>
      <button type='button' onClick={() => setIsSidebarOpen((prev) => !prev)} className={styles.sidebarButton}>
        <DownArrow className={clsx(styles.arrowIcon, isSidebarOpen && styles.arrowIconDown)} />
      </button>

      {isSidebarOpen && <SideBarLinkList />}
    </nav>
  );
}

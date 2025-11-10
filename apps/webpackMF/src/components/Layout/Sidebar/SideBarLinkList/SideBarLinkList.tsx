import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes as routesRaw } from '@src/routes';
import SideBarLinkItem from '../SideBarLinkItem';
import styles from './SideBarLinkList.module.scss';

export default function SideBarLinkList() {
  const { pathname } = useLocation();

  const routes = useMemo(
    () =>
      routesRaw
        .filter((route) => !route.hideFromSidebar)
        .map(({ to, text, activeNames }) => ({
          to,
          text,
          isActive: activeNames.some((name) => name === pathname),
        })),
    [pathname],
  );

  return (
    <div className={styles.sideBarLinkList}>
      {routes.map(({ to, text, isActive }) => (
        <SideBarLinkItem key={text} to={to} text={text} isActive={isActive} />
      ))}
    </div>
  );
}

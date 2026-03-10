import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routes as routesRaw } from '@src/routes';
import SideBarLinkItem from './LinkListItem';

export default function LinkList() {
  const { pathname } = useLocation();

  const routes = useMemo(
    () =>
      routesRaw
        .filter((route) => !route.hideFromSidebar)
        .map(({ to, text, activeNames, isExactMatch }) => {
          const isActive = activeNames.some((name) => {
            if (isExactMatch) return name === pathname;

            const isParentMatch = pathname.startsWith(name);

            return isParentMatch;
          });

          return { to, text, isActive: isActive };
        }),
    [pathname],
  );

  return (
    <div className='flex items-start justify-start gap-4 p-2 text-sm font-thin'>
      {routes.map(({ to, text, isActive }) => (
        <SideBarLinkItem key={text} to={to} text={text} isActive={isActive} />
      ))}
    </div>
  );
}

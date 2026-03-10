import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useFixPathnameWithAsterisk() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/*')) {
      history.pushState(null, '', pathname.slice(0, -2));
    }
  }, [pathname]);
}

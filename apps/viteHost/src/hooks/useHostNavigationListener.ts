import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const HOST_NAVIGATION_EVENT = 'host-navigation-request';

export interface HostNavigationEvent extends CustomEvent {
  detail: {
    path: string;
  };
}

/**
 * Hook that listens for navigation requests from remote micro-frontends
 * and uses the host's router to navigate to the requested path.
 *
 * This allows remotes to navigate to routes handled by the host router
 * without causing full page reloads.
 */
export function useHostNavigationListener() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNavigationRequest = (event: Event) => {
      const customEvent = event as HostNavigationEvent;
      const { path } = customEvent.detail;

      if (typeof path === 'string') {
        navigate(path);
      }
    };

    window.addEventListener(HOST_NAVIGATION_EVENT, handleNavigationRequest);

    return () => {
      window.removeEventListener(HOST_NAVIGATION_EVENT, handleNavigationRequest);
    };
  }, [navigate]);
}

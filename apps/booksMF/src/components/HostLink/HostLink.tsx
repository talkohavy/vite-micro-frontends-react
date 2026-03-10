import { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS_BASE_URL } from '../../common/constants';

export const HOST_NAVIGATION_EVENT = 'host-navigation-request';

interface HostLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * Custom Link component that handles navigation to routes outside the current micro-frontend's scope.
 *
 * - If the target route is within booksMF's scope (/base/books/*), uses React Router's Link normally
 * - If the target route is outside booksMF's scope, dispatches a custom event that the host listens to
 *
 * This allows seamless navigation between host routes and remote routes without full page reloads.
 */
export default function HostLink({ to, children, className, ...otherProps }: HostLinkProps) {
  const isWithinBooksScope = to.startsWith(BOOKS_BASE_URL);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // If navigating outside booksMF's scope, use host navigation
    if (!isWithinBooksScope) {
      e.preventDefault();

      // Dispatch custom event that host will listen to
      const event = new CustomEvent(HOST_NAVIGATION_EVENT, {
        detail: { path: to },
        bubbles: true,
      });
      window.dispatchEvent(event);

      console.log('[booksMF] Requesting host navigation to:', to);
    }
    // Otherwise, let React Router handle it normally
  };

  return (
    <Link to={to} className={className} onClick={handleClick} {...otherProps}>
      {children}
    </Link>
  );
}

import { PAGE_2_BASE } from '../constants';

export function getInitialTabValue(): string {
  const pathParts = window.location.pathname.split('/');

  const outletIndex = pathParts.indexOf(PAGE_2_BASE); // <--- the slug before the tab names

  if (outletIndex !== -1 && pathParts.length > outletIndex + 1) {
    return pathParts[outletIndex + 1]!;
  }

  return '';
}

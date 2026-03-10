import { PAGE_2_BASE } from '../constants';

export function getInitialTabValue(): string {
  const pathParts = window.location.pathname.split('/');

  const tabValueIndex = pathParts.indexOf(PAGE_2_BASE); // <--- the slug before the tab names

  if (tabValueIndex !== -1 && pathParts.length > tabValueIndex + 1) {
    const tabValue = pathParts[tabValueIndex + 1]!;
    return tabValue === '*' ? '' : tabValue;
  }

  return '';
}

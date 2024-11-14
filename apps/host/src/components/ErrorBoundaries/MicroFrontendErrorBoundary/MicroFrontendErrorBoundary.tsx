import { PropsWithChildren } from 'react';
import ErrorBoundaryBase from '../ErrorBoundaryBase';
import MicroFrontendErrorPage from './MicroFrontendErrorPage';

export default function MicroFrontendErrorBoundary(props: PropsWithChildren) {
  const { children } = props;

  return <ErrorBoundaryBase fallback={MicroFrontendErrorPage}>{children}</ErrorBoundaryBase>;
}

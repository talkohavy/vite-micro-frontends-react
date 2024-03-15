import ErrorBoundaryBase from '../ErrorBoundaryBase';
import MicroFrontendErrorPage from './MicroFrontendErrorPage';

export default function MicroFrontendErrorBoundary({ children }) {
  return <ErrorBoundaryBase fallback={MicroFrontendErrorPage}>{children}</ErrorBoundaryBase>;
}

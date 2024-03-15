import ErrorBoundaryBase from '../ErrorBoundaryBase';
import ShowErrorStackTraceDevelopment from './ShowErrorStackTraceDevelopment';

export default function GlobalErrorBoundaryDevelopment({ children }) {
  return <ErrorBoundaryBase fallback={ShowErrorStackTraceDevelopment}>{children}</ErrorBoundaryBase>;
}

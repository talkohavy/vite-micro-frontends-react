import ErrorBoundaryBase from '../ErrorBoundaryBase';
import ErrorStackTraceModalDevelopment from './ErrorStackTraceModalDevelopment';

export default function GlobalErrorBoundaryDevelopment({ children }) {
  return (
    <ErrorBoundaryBase isDevelopmentOnly fallback={ErrorStackTraceModalDevelopment}>
      {children}
    </ErrorBoundaryBase>
  );
}

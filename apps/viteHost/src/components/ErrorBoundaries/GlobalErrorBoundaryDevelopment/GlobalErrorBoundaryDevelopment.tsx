import { PropsWithChildren } from 'react';
import ErrorBoundaryBase from '../ErrorBoundaryBase';
import ErrorStackTraceModalDevelopment from './ErrorStackTraceModalDevelopment';

type GlobalErrorBoundaryDevelopmentProps = PropsWithChildren;

export default function GlobalErrorBoundaryDevelopment(props: GlobalErrorBoundaryDevelopmentProps) {
  const { children } = props;

  return (
    <ErrorBoundaryBase isDevelopmentOnly fallback={ErrorStackTraceModalDevelopment}>
      {children}
    </ErrorBoundaryBase>
  );
}

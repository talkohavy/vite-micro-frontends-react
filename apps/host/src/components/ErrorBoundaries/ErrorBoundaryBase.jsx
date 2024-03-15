import React from 'react';

/**
 * @typedef {{
 *   microServiceName: string;
 *   fallback?: import('react').ReactNode;
 *   customError?: any;
 * }} ErrorBoundaryProps
 */

export default class ErrorBoundaryBase extends React.Component {
  /** @param {ErrorBoundaryProps} props */
  constructor(props) {
    super(props);
    // to keep track of when an error occurs
    // and the error itself

    /** @type {{error: Error | null}} */
    this.state = { hasError: false, error: undefined };
  }

  // update the component state when an error occurs
  static getDerivedStateFromError(error) {
    // specify that the error boundary has caught an error
    return { hasError: true, error };
  }

  /** @override */
  // defines what to do when an error gets caught
  componentDidCatch(error, errorInfo) {
    // log the error
    console.error('error:', error);
    console.error('errorInfo:', errorInfo);
    // record the error in an APM tool...
  }

  /** @override */
  render() {
    // Return children immediately when:
    // - Case 1: not development mode
    // - Case 2: no error
    if (!this.state.hasError || process.env.NODE_ENV !== 'development') return this.props.children;

    const { fallback: Fallback } = this.props;
    const fallbackComponent = <Fallback error={this.state.error} />;

    return fallbackComponent;
  }
}

import clsx from 'clsx';

export default function Box({ className, children }) {
  return <div className={clsx('rounded-lg p-6 shadow-sm', className)}>{children}</div>;
}

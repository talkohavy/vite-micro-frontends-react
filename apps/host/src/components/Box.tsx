import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type BoxProps = PropsWithChildren<{
  className?: string;
}>;

export default function Box(props: BoxProps) {
  const { className, children } = props;

  return <div className={clsx('rounded-lg p-6 shadow-sm', className)}>{children}</div>;
}

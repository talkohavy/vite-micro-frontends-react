import { PropsWithChildren } from 'react';
import ReactDom from 'react-dom';
import { twMerge } from 'tailwind-merge';

type ModalProps = PropsWithChildren<{
  alignTo?: 'center' | 'flex-start' | 'flex-end' | 'left' | 'right';
  id?: string;
  onClickAway?: () => void;
  className?: string;
}>;

export default function Modal(props: ModalProps) {
  const { children, id, onClickAway, alignTo = 'center', className } = props;

  return ReactDom.createPortal(
    <div
      data-test-id={id}
      onKeyDown={onClickAway ? (e) => e.key === 'Escape' && onClickAway() : undefined}
      // @ts-ignore - attributes does not exist on e.target
      onMouseDown={onClickAway ? (e) => e.target.attributes['data-test-id']?.value === id && onClickAway() : undefined}
      className={twMerge(
        'fixed left-0 top-0 z-50 flex size-full items-start overflow-auto bg-black bg-opacity-50 px-1 py-0',
        className,
      )}
      style={{ justifyContent: alignTo }}
    >
      {children}
    </div>,
    document.body,
  );
}

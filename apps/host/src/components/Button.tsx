import { twMerge } from 'tailwind-merge';

const CLASSES = {
  common:
    'flex cursor-pointer items-center justify-center rounded-md px-3 py-1 text-white hover:rounded-lg disabled:pointer-events-none disabled:cursor-default disabled:bg-gray-200 active:rounded-xl',
  sizes: {
    xs: 'h-8',
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-14',
  },
  colors: {
    primary: 'bg-blue-400 hover:bg-blue-300 active:bg-blue-500',
    secondary: 'bg-[#cce4f5] text-[#0161a6] hover:bg-[#daf0ff] active:bg-[#bcd5e6]',
  },
};

type ButtonProps = {
  isPrimary?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  onFocus?: () => void;
  isDisabled?: boolean;
  onMouseOver?: () => void;
  className?: string;
  style?: any;
  label: import('react').ReactNode;
  testId?: string;
};

export default function Button(props: ButtonProps) {
  const {
    isPrimary = true,
    size = 'sm',
    onClick,
    onFocus,
    isDisabled,
    onMouseOver,
    className,
    style,
    testId = '',
    label,
  } = props;

  const buttonType = isPrimary ? 'primary' : 'secondary';

  return (
    <button
      type='button'
      onClick={onClick}
      onFocus={onFocus}
      disabled={isDisabled}
      onMouseOver={onMouseOver}
      className={twMerge(CLASSES.common, CLASSES.sizes[size], CLASSES.colors[buttonType], className)}
      style={style}
      data-test-id={`${testId}Button`}
    >
      {label}
    </button>
  );
}

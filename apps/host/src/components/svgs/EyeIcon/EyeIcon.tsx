import { twMerge } from 'tailwind-merge';

type EyeIconProps = {
  size?: number;
  isPasswordHidden?: boolean;
  className?: string;
};

export default function EyeIcon(props: EyeIconProps) {
  const { size = 30, isPasswordHidden = true, className } = props;

  return (
    <svg
      style={{ width: size, height: size }}
      viewBox='0 0 100 100'
      focusable='false'
      aria-hidden='true'
      className={twMerge('stroke-current fill-current stroke-6', className)}
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>eye icon</title>

      {/* Pupil: */}
      <circle r='14' cx='50' cy='50' strokeWidth='0' />
      {/* Eye Spark: */}
      {/* <circle stroke='black' fill='white' r='3' cx='60' cy='42' /> */}
      {/* Upper arch: */}
      <path strokeLinecap='round' fill='none' d='M4 50 Q50 0, 96 50' />

      {/* Lower arch: */}
      <path strokeLinecap='round' fill='none' d='M4 50 Q50 100, 96 50' />
      {/* X Lines: */}
      {isPasswordHidden && (
        <>
          <path strokeLinecap='round' fill='none' d='M5 80 L95 20' />
          <path strokeLinecap='round' fill='none' d='M5 20 L95 80' />
        </>
      )}
    </svg>
  );
}

import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { wrapInDebounce } from '@talkohavy/lodash';

const defaultDontChangeRule = (_e, newValue) => ({ change: true, newValue });

const CLASSES = {
  commonInputAndInputWrapper: 'relative h-10 w-full rounded-md bg-transparent',
  input: 'px-3 disabled:pointer-events-none',
  inputWrapper:
    '[&:has(input:disabled)]:border-slate-400 border-1.5 group relative flex items-center justify-between border-gray-800 focus-within:border-blue-700 hover:border-blue-300 focus-within:hover:border-blue-700 dark:border-black dark:bg-slate-600 dark:focus-within:border-sky-100',
  label:
    'pointer-events-none absolute z-10 my-0 flex h-4 w-auto translate-y-half items-center justify-center rounded-full bg-white px-1 py-0 text-lg transition-all hover:cursor-text group-focus-within:text-blue-700 dark:bg-slate-600 dark:group-focus-within:text-white ltr:left-3 rtl:right-3',
  topLevelWrapper: 'relative max-w-full rounded-md bg-transparent',
};

/** @param { import('../types').InputFloatProps } props */
export default function InputFloat({
  type = 'text',
  value,
  setValue,
  dontChangeRule = defaultDontChangeRule,
  labelContent,
  wrapperClassName,
  inputClass,
  inputStyle,
  autoFocus,
  onInputFocus,
  onInputBlur,
  onInputChange,
  onInputClick,
  onInputKeyDown,
  isDisabled,
  isRTL,
  testId = '',
  debounceTime,
  isAlwaysFloating,
  rendererLeft,
  rendererRight,
}) {
  // all useStates:
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [innerValue, setInnerValue] = useState(() => value);

  useEffect(() => setInnerValue(value), [value]);

  const isFloating = isFocused || innerValue !== '' || !!rendererLeft || isAlwaysFloating;

  // all useCallbacks:
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setOuterValue = useCallback(
    Number.isInteger(debounceTime) ? wrapInDebounce(setValue, debounceTime) : setValue,
    [debounceTime, setValue],
  );

  const onChange = useCallback(
    (e) => {
      const { change, newValue } = dontChangeRule(e, e.target.value);
      if (change) {
        setInnerValue(newValue);
        setOuterValue(newValue);
        onInputChange?.({ newValue });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, dontChangeRule, onInputChange],
  );

  // all on functions:
  const onFocus = () => {
    setIsFocused(true);
    onInputFocus?.();
  };
  const onBlur = (e) => {
    setIsFocused(false);
    onInputBlur?.(e, { setIsFocused, setInnerValue }); // A SelectFloat will validate in here
  };
  const onClick = () => {
    setIsFocused(true);
    onInputClick?.();
  };
  const onKeyDown = (e) => onInputKeyDown?.(e, { setIsFocused });
  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div className={clsx(CLASSES.topLevelWrapper, wrapperClassName)}>
      <div
        className={clsx(
          CLASSES.commonInputAndInputWrapper,
          CLASSES.inputWrapper,
          isDisabled ? 'bg-gray-100' : 'bg-white',
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {labelContent && (
          <label
            className={twMerge(
              CLASSES.label,
              isFloating ? 'top-0 scale-80 ltr:-translate-x-10 rtl:translate-x-10' : 'top-1/2 translate-y-half',
              isDisabled && 'text-slate-400',
            )}
            style={{ direction: isRTL === undefined ? undefined : isRTL ? 'rtl' : 'ltr' }}
          >
            {labelContent}
          </label>
        )}
        {rendererLeft?.({ isFocused, isHovered })}

        <input
          type={type}
          value={innerValue}
          onChange={onChange}
          className={clsx(
            CLASSES.commonInputAndInputWrapper,
            CLASSES.input,
            rendererLeft && 'ltr:pl-10 rtl:pr-10',
            rendererRight && 'ltr:pr-10 rtl:pl-10',
            inputClass,
          )}
          style={inputStyle}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
          autoComplete='off'
          disabled={isDisabled}
          data-test-id={`${testId}Input`}
        />

        {rendererRight?.({ isFocused, isHovered })}
      </div>
    </div>
  );
}

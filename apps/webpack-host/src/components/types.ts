type BasicInputProps = {
  /**
   * The input's type.
   * Possible options are: text | password
   * @default 'text'
   */
  type?: 'text' | 'password';
  value: any;
  defaultValue?: any;
  isDisabled?: boolean;
  setValue: (value: any) => void;
  /**
   * A _**rule**_ function to prevent setSelectedValue from being called.
   * @default (e, newValue) => ({ change: true, newValue })
   */
  dontChangeRule?: (e: any, value: any) => { change: boolean; newValue: any };
  /**
   * If a number is provided, setValue will be debounced by that amount.
   * The custom Input keeps an inner value, which is exactly the same as the outer value (provided throught `value`), if debounceTime is not used.
   * Once debounceTime is used, you in fact separate the 2 value.
   * For an X period of time, the inner value will be _the more_ updated one, where-as the outer value will match it within X time.
   *
   * **IMPORTANT NOTE!!!**
   * Do NOT pass debounceTime when the input is used inside a form, or anywhere where there's a confirmation/submit button!
   * Since validation is being delayed, a race condition might occur that would interfer with your original intentions.
   */
  debounceTime?: number;
  isAlwaysFloating?: boolean;
  wrapperClassName?: string;
  inputClass?: string;
  inputStyle?: any;
  autoFocus?: boolean;
  onInputFocus?: () => any;
  onInputBlur?: (e: any, props: { setIsFocused(value: boolean): void; setInnerValue?(value: any): void }) => any;
  onInputChange?: (props: { newValue: string }) => any;
  onInputClick?: () => any;
  onInputKeyDown?: (e: any, props: { setIsFocused: (value: boolean) => void }) => any;
  testId?: string;
};

// -----------------------
// Type 2: InputFloatProps
// -----------------------
type InputFloatProps = BasicInputProps & {
  labelContent?: string;
  /**
   * isRTL?
   * @default undefined
   */
  isRTL?: boolean;
  rendererRight?: (props: {
    isFocused: boolean;
    isHovered: boolean;
  }) => React.ReactNode;
  rendererLeft?: (props: {
    isFocused: boolean;
    isHovered: boolean;
  }) => React.ReactNode;
};

// --------------------------
// Type 2: InputPasswordProps
// --------------------------
type InputPasswordProps = Omit<InputFloatProps, 'type'>;

// ----------------------
// Type 3: InputFlatProps
// ----------------------
type InputFlatProps = BasicInputProps & { labelContent?: string; placeholder?: string; labelClass?: string };

// ------------------------
// Type 4: SelectFloatProps
// ------------------------
type SelectFloatProps = BasicInputProps & {
  labelContent: string;
  /**
   * Required. An array of options to present as the list to choose from.
   */
  options: Array<any>;
  /**
   * A function to guide how to extract the value from an option object.
   * @default (option) => option.label
   */
  getOptionLabel?: (option: any) => string;
  labelOnEmptyList?: string;
  /**
   * AutoComplete uses this feature internally, and sets it to true.
   * @default false
   */
  shouldFilterOptions?: boolean;
  /**
   * isRTL?
   * @default undefined
   */
  isRTL?: boolean;
};

export type { BasicInputProps, InputFlatProps, InputFloatProps, InputPasswordProps, SelectFloatProps };

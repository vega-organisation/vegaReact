import { InputHTMLAttributes, ReactNode } from 'react';
import { Country } from 'react-phone-number-input';

/**
 * Props for the PhoneNumberInput component.
 * Extends native HTML input attributes (excluding `onChange`, `value`, and `size`
 * which are overridden with phone-specific types).
 */
export interface PhoneNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {

  /** Optional id for the input element. Auto-generated if not provided. */
  id?: string;

  /** Label displayed above the input. Accepts any React node. */
  label?: ReactNode;

  /** Helper or error text displayed below the input. Accepts any React node. */
  helperText?: ReactNode;

  /** Visual status of the input, affects border and helper text color. */
  status?: 'default' | 'error' | 'success';

  /** Size variant of the input field. */
  size?: 'small' | 'medium' | 'large';

  /** If true, the input expands to fill the width of its container. */
  fullWidth?: boolean;

  /** The current phone number value in E.164 format (e.g. "+33612345678"). */
  value?: string;

  /** Callback fired when the phone number value changes. */
  onChange: (value?: string) => void;

  /**
   * Default country code shown in the country selector (ISO 3166-1 alpha-2).
   * Required — the developer must explicitly set the appropriate default for their context.
   * @example "FR" | "US" | "DE"
   */
  defaultCountry: Country;
}

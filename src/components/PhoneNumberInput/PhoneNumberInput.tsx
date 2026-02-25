import React, { useId } from 'react';
import PhoneInput from 'react-phone-number-input';
import type { PhoneNumberInputProps } from "./PhoneNumberInput.types";
import "./PhoneNumberInput.css";

/**
 * PhoneNumberInput component with country code selector and automatic formatting.
 *
 * @example
 * <PhoneNumberInput
 *   label="Phone number"
 *   defaultCountry="FR"
 *   value={phone}
 *   onChange={setPhone}
 * />
 */
export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  helperText,
  status = "default",
  size = "medium",
  fullWidth = false,
  className = "",
  id,
  disabled = false,
  value,
  onChange,
  defaultCountry,
  placeholder,
  ...props
}) => {

  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;

  const containerClasses = [
    "vega-phone-wrapper",
    fullWidth ? "vega-phone-wrapper--full-width" : "",
    disabled ? "vega-phone-wrapper--disabled" : "",
    status !== "default" ? `vega-phone-wrapper--${status}` : "",
    `vega-phone-wrapper--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="vega-phone-label">
          {label}
        </label>
      )}

      <PhoneInput
        id={inputId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultCountry={defaultCountry}
        placeholder={placeholder}
        aria-label={label ? String(label) : placeholder}
        aria-describedby={helperText ? helperId : undefined}
        aria-invalid={status === "error"}
        aria-disabled={disabled}
        {...props}
      />

      {helperText && (
        <p id={helperId} className={`vega-phone-helper vega-phone-helper--${status}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

PhoneNumberInput.displayName = "PhoneNumberInput";

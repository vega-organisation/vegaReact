import React, { useId } from 'react';
import PhoneInput from 'react-phone-number-input';
import type { PhoneNumberInputProps } from "./PhoneNumberInput.types";
import "./PhoneNumberInput.css"; 

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
  defaultCountry = "FR",
  placeholder,
  ...props 
}) => {
  
  const generatedId = useId();
  const inputId = id || generatedId;
  
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
        {...props}
      />

      {helperText && (
        <p className={`vega-phone-helper vega-phone-helper--${status}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

PhoneNumberInput.displayName = "PhoneNumberInput";
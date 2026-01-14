import React, { useId } from 'react';
import type { InputTextProps } from "./InputText.types";
import "./InputText.css"; 

export const InputText: React.FC<InputTextProps> = ({
  label,
  helperText,
  status = "default",
  size = "medium",
  fullWidth = false,
  className = "",
  id,
  disabled = false,
  ...props 
}) => {
  
  const generatedId = useId();
  const inputId = id || generatedId;
  
  const containerClasses = [
    "vega-input-wrapper",
    fullWidth ? "vega-input-wrapper--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClasses = [
    "vega-input",
    `vega-input--${size}`,
    status !== "default" ? `vega-input--${status}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="vega-input-label">
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        className={inputClasses}
        disabled={disabled}
        {...props}
      />

      {helperText && (
        <p className={`vega-input-helper vega-input-helper--${status}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

InputText.displayName = "InputText";
import type { InputPhoneNumberProps } from "./InputPhoneNumber.types";
import "./InputPhoneNumber.css";
import { useId } from "react";

export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  label,
  placeholder = "Numéro de téléphone",
  value,
  onChange,
  disabled = false,
  error,
  success = false,
  helperText,
  iconLeft,
  iconRight,
  size = "md",
  fullWidth = false,
  className = "",
  id,
  name,
  ...props
}) => {
  const inputId = id || useId();
  const message = error || helperText;

  const wrapperClass = [
    "vega-input-wrapper",
    fullWidth && "vega-input-wrapper--full-width",
    className,
  ].filter(Boolean).join(" ");

  const containerClass = [
    "vega-input-container",
    `vega-input-container--${size}`,
    error && "vega-input-container--error",
    success && !error && "vega-input-container--success",
    disabled && "vega-input-container--disabled",
  ].filter(Boolean).join(" ");

  const inputClass = [
    "vega-input",
    iconLeft && "vega-input--with-icon-left",
    iconRight && "vega-input--with-icon-right",
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperClass}>
      {label && <label htmlFor={inputId} className="vega-input__label">{label}</label>}
      <div className={containerClass}>
        {iconLeft && <span className="vega-input__icon vega-input__icon--left">{iconLeft}</span>}
        <input
          id={inputId}
          name={name}
          type="tel"
          className={inputClass}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={message ? `${inputId}-message` : undefined}
          {...props}
        />
        {iconRight && <span className="vega-input__icon vega-input__icon--right">{iconRight}</span>}
      </div>
      {message && (
        <span id={`${inputId}-message`} className={`vega-input__message ${error ? "vega-input__message--error" : ""}`}>
          {message}
        </span>
      )}
    </div>
  );
};

InputPhoneNumber.displayName = "InputPhoneNumber";

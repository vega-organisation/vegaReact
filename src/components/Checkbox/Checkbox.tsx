import React, { useId, useRef, useEffect } from "react";
import { Check, Minus } from "lucide-react";
import type { CheckboxProps } from "./Checkbox.types";
import "./Checkbox.css";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  size = "medium",
  indeterminate = false,
  error,
  fullWidth = false,
  className = "",
  id,
  disabled = false,
  checked,
  defaultChecked,
  onChange,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const isControlled = checked !== undefined;

  const describedBy = [
    description ? descriptionId : "",
    error ? errorId : "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const wrapperClasses = [
    "vega-checkbox",
    `vega-checkbox--${size}`,
    error ? "vega-checkbox--error" : "",
    disabled ? "vega-checkbox--disabled" : "",
    fullWidth ? "vega-checkbox--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrapperClasses}>
      <label className="vega-checkbox__control" htmlFor={inputId}>
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          className="vega-checkbox__input"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          aria-checked={indeterminate ? "mixed" : undefined}
          {...(isControlled ? { checked } : { defaultChecked })}
          onChange={onChange}
          {...props}
        />
        <span className="vega-checkbox__box" aria-hidden="true">
          <Check className="vega-checkbox__icon vega-checkbox__icon--check" />
          <Minus className="vega-checkbox__icon vega-checkbox__icon--indeterminate" />
        </span>
        {label && <span className="vega-checkbox__label">{label}</span>}
      </label>

      {description && (
        <p id={descriptionId} className="vega-checkbox__description">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="vega-checkbox__error">
          {error}
        </p>
      )}
    </div>
  );
};

Checkbox.displayName = "Checkbox";

import React, { useId, useState } from 'react';
import type { InputEmailProps } from './InputEmail.types';
import './InputEmail.css';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

const validateEmail = (value: string): boolean => EMAIL_REGEX.test(value);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.25" />
    <path d="M1.5 5.5L8 9.5L14.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
    <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 11V11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const InputEmail: React.FC<InputEmailProps> = ({
  label,
  helperText,
  status: externalStatus,
  size = 'medium',
  fullWidth = false,
  className = '',
  id,
  disabled = false,
  value,
  defaultValue,
  onChange,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;

  const [touched, setTouched] = useState(false);
  const [localValue, setLocalValue] = useState<string>(
    typeof defaultValue === 'string' ? defaultValue : ''
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value ?? '') : localValue;

  const computedStatus = (() => {
    if (externalStatus === 'error' || externalStatus === 'success') return externalStatus;
    if (!touched || currentValue === '') return 'default';
    return validateEmail(currentValue) ? 'success' : 'error';
  })();

  const effectiveHelperText =
    helperText !== undefined
      ? helperText
      : computedStatus === 'error'
        ? 'Please enter a valid email address.'
        : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTouched(true);
    if (!isControlled) setLocalValue(e.target.value);
    onChange?.(e);
  };

  const containerClasses = [
    'vega-email-wrapper',
    fullWidth ? 'vega-email-wrapper--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const fieldClasses = [
    'vega-email-field',
    `vega-email-field--${size}`,
    computedStatus !== 'default' ? `vega-email-field--${computedStatus}` : '',
    disabled ? 'vega-email-field--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="vega-email-label">
          {label}
        </label>
      )}

      <div className={fieldClasses}>
        <span className="vega-email-icon-lead">
          <MailIcon />
        </span>

        <input
          id={inputId}
          type="email"
          className="vega-email-input"
          disabled={disabled}
          aria-invalid={computedStatus === 'error'}
          aria-describedby={effectiveHelperText ? helperId : undefined}
          {...(isControlled ? { value } : { defaultValue })}
          onChange={handleChange}
          {...props}
        />

        {computedStatus !== 'default' && (
          <span
            className={`vega-email-icon-trail vega-email-icon-trail--${computedStatus}`}
            aria-hidden="true"
          >
            {computedStatus === 'success' ? <CheckIcon /> : <ErrorIcon />}
          </span>
        )}
      </div>

      {effectiveHelperText && (
        <p id={helperId} className={`vega-email-helper vega-email-helper--${computedStatus}`}>
          {effectiveHelperText}
        </p>
      )}
    </div>
  );
};

InputEmail.displayName = 'InputEmail';

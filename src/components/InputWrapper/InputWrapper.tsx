import React from 'react';
import type { InputWrapperProps } from './InputWrapper.types';
import './InputWrapper.css';

export const InputWrapper: React.FC<InputWrapperProps> = ({
  label,
  helperText,
  status = 'default',
  size = 'medium',
  fullWidth = false,
  className = '',
  disabled = false,
  inputId,
  helperId,
  leadIcon,
  trailIcon,
  children,
}) => {
  const wrapperClasses = [
    'vega-field-wrapper',
    fullWidth ? 'vega-field-wrapper--full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [
    'vega-field-container',
    `vega-field-container--${size}`,
    status !== 'default' ? `vega-field-container--${status}` : '',
    disabled ? 'vega-field-container--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label htmlFor={inputId} className="vega-field-label">
          {label}
        </label>
      )}

      <div className={containerClasses}>
        {leadIcon && (
          <span className="vega-field-icon-lead" aria-hidden="true">
            {leadIcon}
          </span>
        )}

        {children}

        {trailIcon && (
          <span
            className={[
              'vega-field-icon-trail',
              status !== 'default' ? `vega-field-icon-trail--${status}` : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            {trailIcon}
          </span>
        )}
      </div>

      {helperText && (
        <p
          id={helperId}
          className={[
            'vega-field-helper',
            status !== 'default' ? `vega-field-helper--${status}` : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

InputWrapper.displayName = 'InputWrapper';

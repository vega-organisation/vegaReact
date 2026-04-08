import React, { useId } from 'react';
import type { InputTextProps } from './InputText.types';
import { InputWrapper } from '../InputWrapper';
import './InputText.css';

export const InputText: React.FC<InputTextProps> = ({
  label,
  helperText,
  status = 'default',
  size = 'medium',
  fullWidth = false,
  className = '',
  id,
  disabled = false,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const helperId = `${inputId}-helper`;

  return (
    <InputWrapper
      label={label}
      helperText={helperText}
      status={status}
      size={size}
      fullWidth={fullWidth}
      className={className}
      disabled={disabled}
      inputId={inputId}
      helperId={helperText ? helperId : undefined}
    >
      <input
        id={inputId}
        className="vega-input"
        disabled={disabled}
        aria-describedby={helperText ? helperId : undefined}
        {...props}
      />
    </InputWrapper>
  );
};

InputText.displayName = 'InputText';

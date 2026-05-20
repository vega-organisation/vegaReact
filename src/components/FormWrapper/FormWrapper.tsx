import { AlertCircle } from 'lucide-react';
import { FormContext } from './useFormContext';
import type { FormWrapperProps } from './FormWrapper.types';
import './FormWrapper.css';

export const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  isSubmitting = false,
  disabled = false,
  error,
  gap = 'md',
  children,
  className,
  ...rest
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || disabled) return;
    onSubmit(e);
  };

  const classes = [
    'vega-form',
    `vega-form--gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FormContext.Provider value={{ isSubmitting, isDisabled: disabled || isSubmitting, error: error ?? null }}>
      <form
        className={classes}
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
        {...rest}
      >
        {isSubmitting && (
          <div className="vega-form__overlay" aria-hidden="true" />
        )}

        {error && (
          <div className="vega-form__error" role="alert" aria-live="polite">
            <AlertCircle className="vega-form__error-icon" size={16} aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {children}
      </form>
    </FormContext.Provider>
  );
};

FormWrapper.displayName = 'FormWrapper';

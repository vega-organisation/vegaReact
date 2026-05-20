import { FormHTMLAttributes, ReactNode } from 'react';

export type FormWrapperGap = 'sm' | 'md' | 'lg';

export interface FormWrapperProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  error?: string;
  gap?: FormWrapperGap;
  children: ReactNode;
  className?: string;
}

export interface FormContextValue {
  isSubmitting: boolean;
  isDisabled: boolean;
  error: string | null;
}

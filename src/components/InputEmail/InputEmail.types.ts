import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputEmailProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  helperText?: ReactNode;
  status?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

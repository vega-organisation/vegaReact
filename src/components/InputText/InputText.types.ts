import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {

  label?: ReactNode;

  helperText?: ReactNode;

  status?: 'default' | 'error' | 'success';

  variant?: 'outlined' | 'filled';

  size?: 'small' | 'medium' | 'large';

  fullWidth?: boolean
}

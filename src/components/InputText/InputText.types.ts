import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
 
  label?: ReactNode;

  helperText?: ReactNode;
  
  status?: 'normal' | 'error' | 'success';

  variant?: 'outlined' | 'filled';
  
  size?: 'small' | 'medium' | 'large';
  
  fullWidth?: boolean;
}

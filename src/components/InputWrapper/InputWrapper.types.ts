import { ReactNode } from 'react';

export interface InputWrapperProps {
  label?: ReactNode;
  helperText?: ReactNode;
  status?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  inputId?: string;
  helperId?: string;
  leadIcon?: ReactNode;
  trailIcon?: ReactNode;
  children: ReactNode;
}

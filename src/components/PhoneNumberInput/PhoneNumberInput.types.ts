import { InputHTMLAttributes, ReactNode } from 'react';
import { Country } from 'react-phone-number-input'; 

export interface PhoneNumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  
  id?: string;

  label?: ReactNode;

  helperText?: ReactNode;

  status?: 'default' | 'error' | 'success';

  size?: 'small' | 'medium' | 'large';

  fullWidth?: boolean;

  value?: string;

  onChange: (value?: string) => void;

  defaultCountry?: Country; 
}
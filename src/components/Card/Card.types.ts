import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  
  children?: ReactNode;
  
  variant?: 'default' | 'outlined';
  
  headerImage?: string;
  
  imageRatio?: '16:9' | '1:1' | '4:3';
  
  title?: string;
  
  subtitle?: string;
  
  padding?: 'none' | 'small' | 'medium' | 'large';
  
  selected?: boolean;
  
  disabled?: boolean;
}
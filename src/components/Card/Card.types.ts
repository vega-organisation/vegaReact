import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Makes the whole card a clickable element (adds role="button" and keyboard support) */
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export interface CardMediaProps {
  /** Image source URL */
  src: string;
  alt?: string;
  /** Aspect ratio of the media area. Default: "16/9" */
  ratio?: '16/9' | '4/3' | '1/1' | '3/4';
  className?: string;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

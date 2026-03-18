import type { ReactNode } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastData {
  id: string;
  message: ReactNode;
  title?: string;
  variant?: ToastVariant;
  /** Duration in ms. Set to 0 to disable auto-dismiss. Default: 4000 */
  duration?: number;
}

export interface ToastContextValue {
  add: (toast: Omit<ToastData, 'id'>) => string;
  remove: (id: string) => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
}

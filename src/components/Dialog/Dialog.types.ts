import type { ReactNode } from 'react';

export type DialogSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  size?: DialogSize;
  /** Close dialog when clicking the backdrop. Default: true */
  closeOnBackdrop?: boolean;
  children: ReactNode;
  className?: string;
}

export interface DialogHeaderProps {
  children: ReactNode;
  /** Renders a close (×) button wired to Dialog's onClose */
  onClose?: () => void;
  className?: string;
}

export interface DialogBodyProps {
  children: ReactNode;
  className?: string;
}

export interface DialogFooterProps {
  children: ReactNode;
  className?: string;
}

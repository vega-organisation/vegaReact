import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type {
  DialogBodyProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogProps,
} from './Dialog.types';
import './Dialog.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type DialogComponent = React.FC<DialogProps> & {
  Header: React.FC<DialogHeaderProps>;
  Body: React.FC<DialogBodyProps>;
  Footer: React.FC<DialogFooterProps>;
};

export const Dialog: DialogComponent = ({
  open,
  onClose,
  size = 'md',
  closeOnBackdrop = true,
  children,
  className = '',
}) => {
  const [active, setActive] = useState(false);
  const [exiting, setExiting] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Mount / unmount with exit animation
  useEffect(() => {
    if (open) {
      setExiting(false);
      setActive(true);
    } else if (active) {
      setExiting(true);
      const t = setTimeout(() => setActive(false), 250);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Focus management
  useEffect(() => {
    if (active && !exiting) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
      document.body.style.overflow = 'hidden';
    } else if (!active) {
      previousFocusRef.current?.focus();
      document.body.style.overflow = '';
    }
  }, [active, exiting]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnBackdrop && e.target === e.currentTarget) onClose();
    },
    [closeOnBackdrop, onClose]
  );

  if (!active) return null;

  return createPortal(
    <div
      className={['vega-dialog-backdrop', exiting ? 'vega-dialog-backdrop--exiting' : '']
        .filter(Boolean)
        .join(' ')}
      onClick={handleBackdropClick}
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-hidden="false"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={[
          'vega-dialog-panel',
          `vega-dialog-panel--${size}`,
          exiting ? 'vega-dialog-panel--exiting' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

Dialog.displayName = 'Dialog';

const DialogHeader: React.FC<DialogHeaderProps> = ({ children, onClose, className = '' }) => (
  <div className={['vega-dialog-header', className].filter(Boolean).join(' ')}>
    <div className="vega-dialog-header-content">{children}</div>
    {onClose && (
      <button className="vega-dialog-close" onClick={onClose} aria-label="Close dialog">
        <X size={18} />
      </button>
    )}
  </div>
);
DialogHeader.displayName = 'Dialog.Header';

const DialogBody: React.FC<DialogBodyProps> = ({ children, className = '' }) => (
  <div className={['vega-dialog-body', className].filter(Boolean).join(' ')}>{children}</div>
);
DialogBody.displayName = 'Dialog.Body';

const DialogFooter: React.FC<DialogFooterProps> = ({ children, className = '' }) => (
  <div className={['vega-dialog-footer', className].filter(Boolean).join(' ')}>{children}</div>
);
DialogFooter.displayName = 'Dialog.Footer';

Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;

import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { ToastData, ToastProviderProps, ToastVariant } from './Toast.types';
import { ToastContext } from './useToast';
import './Toast.css';

const ICONS: Record<ToastVariant, React.ReactElement> = {
  success: <CheckCircle2 size={18} />,
  error: <XCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  info: <Info size={18} />,
};

const DEFAULT_DURATION = 4000;

interface ToastItemProps extends ToastData {
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({
  id,
  message,
  title,
  variant = 'info',
  duration = DEFAULT_DURATION,
  onDismiss,
}) => {
  const [exiting, setExiting] = useState(false);

  const dismiss = useCallback(() => setExiting(true), []);

  useEffect(() => {
    if (duration === 0) return;
    const timer = setTimeout(dismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, dismiss]);

  useEffect(() => {
    if (!exiting) return;
    const timer = setTimeout(() => onDismiss(id), 300);
    return () => clearTimeout(timer);
  }, [exiting, id, onDismiss]);

  const itemClasses = [
    'vega-toast',
    `vega-toast--${variant}`,
    exiting ? 'vega-toast--exiting' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={itemClasses}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
    >
      <span className="vega-toast-icon" aria-hidden="true">
        {ICONS[variant]}
      </span>

      <div className="vega-toast-content">
        {title && <p className="vega-toast-title">{title}</p>}
        <p className="vega-toast-message">{message}</p>
      </div>

      <button
        className="vega-toast-close"
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>

      {duration > 0 && (
        <div
          className="vega-toast-progress"
          style={{ '--toast-duration': `${duration}ms` } as React.CSSProperties}
        />
      )}
    </div>
  );
};

ToastItem.displayName = 'ToastItem';

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const add = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ add, remove }}>
      {children}
      {createPortal(
        <div
          className={`vega-toast-container vega-toast-container--${position}`}
          aria-label="Notifications"
        >
          {toasts.map((toast) => (
            <ToastItem key={toast.id} {...toast} onDismiss={remove} />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

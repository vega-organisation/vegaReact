import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { ToastProvider } from './Toast';
import { useToast } from './useToast';

// Helper component that triggers a toast
const ToastTrigger: React.FC<{ variant?: string; message?: string; title?: string; duration?: number }> = ({
  variant = 'info',
  message = 'Test message',
  title,
  duration,
}) => {
  const { add } = useToast();
  return (
    <button
      onClick={() => add({ message, variant: variant as 'info', title, duration })}
    >
      Show toast
    </button>
  );
};

describe('ToastProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders children', () => {
    render(
      <ToastProvider>
        <span>App content</span>
      </ToastProvider>
    );
    expect(screen.getByText('App content')).toBeInTheDocument();
  });

  it('renders the toast container', () => {
    render(<ToastProvider><div /></ToastProvider>);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('applies position class', () => {
    render(<ToastProvider position="bottom-center"><div /></ToastProvider>);
    expect(screen.getByLabelText('Notifications')).toHaveClass('vega-toast-container--bottom-center');
  });

  it('shows a toast when add is called', () => {
    render(
      <ToastProvider>
        <ToastTrigger message="Hello!" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Show toast' }).click();
    });
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('shows toast with title', () => {
    render(
      <ToastProvider>
        <ToastTrigger title="Success" message="Done!" variant="success" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Show toast' }).click();
    });
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Done!')).toBeInTheDocument();
  });

  it('uses role="alert" for error toasts', () => {
    render(
      <ToastProvider>
        <ToastTrigger variant="error" message="Error!" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Show toast' }).click();
    });
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for non-error toasts', () => {
    render(
      <ToastProvider>
        <ToastTrigger variant="info" message="Info" />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Show toast' }).click();
    });
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('dismisses toast via close button', () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger message="Dismiss me" duration={0} />
      </ToastProvider>
    );
    act(() => {
      screen.getByRole('button', { name: 'Show toast' }).click();
    });
    expect(screen.getByText('Dismiss me')).toBeInTheDocument();

    act(() => {
      screen.getByLabelText('Dismiss notification').click();
    });
    act(() => {
      vi.advanceTimersByTime(350);
    });
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});

describe('useToast', () => {
  it('throws when used outside ToastProvider', () => {
    const Broken = () => {
      useToast();
      return null;
    };
    expect(() => render(<Broken />)).toThrow('useToast must be used within a <ToastProvider>');
  });
});

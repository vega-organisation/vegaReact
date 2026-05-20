import { render, screen, act, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { Dialog } from './Dialog';

// Note: Dialog renders inside a backdrop with aria-hidden="true",
// so role queries inside the dialog need { hidden: true }.
const HIDDEN = { hidden: true } as const;

const Body = () => (
  <Dialog.Body>
    <button>first</button>
    <button>middle</button>
    <button>last</button>
  </Dialog.Body>
);

describe('Dialog', () => {
  afterEach(() => {
    cleanup();
    document.body.style.overflow = '';
  });

  it('renders nothing when closed', () => {
    render(<Dialog open={false} onClose={vi.fn()}><Body /></Dialog>);
    expect(screen.queryByRole('dialog', HIDDEN)).not.toBeInTheDocument();
  });

  it('renders when open with dialog role and aria-modal', () => {
    render(<Dialog open onClose={vi.fn()}><Body /></Dialog>);
    const dialog = screen.getByRole('dialog', HIDDEN);
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders children inside the panel', () => {
    render(
      <Dialog open onClose={vi.fn()}>
        <Dialog.Body>Hello world</Dialog.Body>
      </Dialog>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('applies size class', () => {
    render(<Dialog open onClose={vi.fn()} size="lg"><Body /></Dialog>);
    expect(screen.getByRole('dialog', HIDDEN)).toHaveClass('vega-dialog-panel--lg');
  });

  it('uses default size md', () => {
    render(<Dialog open onClose={vi.fn()}><Body /></Dialog>);
    expect(screen.getByRole('dialog', HIDDEN)).toHaveClass('vega-dialog-panel--md');
  });

  it('merges custom className', () => {
    render(<Dialog open onClose={vi.fn()} className="custom"><Body /></Dialog>);
    expect(screen.getByRole('dialog', HIDDEN)).toHaveClass('custom');
  });

  it('calls onClose on backdrop click by default', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose}><Body /></Dialog>);
    const backdrop = document.querySelector('.vega-dialog-backdrop')!;
    await user.click(backdrop as HTMLElement);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not call onClose on backdrop click when closeOnBackdrop is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} closeOnBackdrop={false}>
        <Body />
      </Dialog>
    );
    const backdrop = document.querySelector('.vega-dialog-backdrop')!;
    await user.click(backdrop as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking inside the panel', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose}><Body /></Dialog>);
    await user.click(screen.getByRole('dialog', HIDDEN));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose on Escape key', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose}><Body /></Dialog>);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('locks body scroll when open and restores on close', () => {
    vi.useFakeTimers();
    try {
      const { rerender } = render(<Dialog open onClose={vi.fn()}><Body /></Dialog>);
      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Dialog open={false} onClose={vi.fn()}><Body /></Dialog>);
      act(() => { vi.advanceTimersByTime(300); });
      expect(document.body.style.overflow).toBe('');
    } finally {
      vi.useRealTimers();
    }
  });

  it('focuses first focusable element on open', () => {
    render(<Dialog open onClose={vi.fn()}><Body /></Dialog>);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'first', ...HIDDEN }));
  });

  it('restores previously focused element on close', () => {
    vi.useFakeTimers();
    try {
      const Outside = () => <button>outside</button>;
      const { rerender } = render(
        <>
          <Outside />
          <Dialog open={false} onClose={vi.fn()}><Body /></Dialog>
        </>
      );
      const outsideBtn = screen.getByRole('button', { name: 'outside' });
      outsideBtn.focus();
      expect(document.activeElement).toBe(outsideBtn);

      rerender(
        <>
          <Outside />
          <Dialog open onClose={vi.fn()}><Body /></Dialog>
        </>
      );
      expect(document.activeElement).toBe(screen.getByRole('button', { name: 'first', ...HIDDEN }));

      rerender(
        <>
          <Outside />
          <Dialog open={false} onClose={vi.fn()}><Body /></Dialog>
        </>
      );
      act(() => { vi.advanceTimersByTime(300); });
      expect(document.activeElement).toBe(outsideBtn);
    } finally {
      vi.useRealTimers();
    }
  });

  it('traps focus on Tab from last back to first', async () => {
    const user = userEvent.setup();
    render(<Dialog open onClose={vi.fn()}><Body /></Dialog>);
    const last = screen.getByRole('button', { name: 'last', ...HIDDEN });
    last.focus();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'first', ...HIDDEN }));
  });

  it('traps focus on Shift+Tab from first to last', async () => {
    const user = userEvent.setup();
    render(<Dialog open onClose={vi.fn()}><Body /></Dialog>);
    const first = screen.getByRole('button', { name: 'first', ...HIDDEN });
    first.focus();
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'last', ...HIDDEN }));
  });
});

describe('Dialog.Header', () => {
  afterEach(cleanup);

  it('renders children', () => {
    render(<Dialog.Header>Title</Dialog.Header>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders close button when onClose is provided', () => {
    render(<Dialog.Header onClose={vi.fn()}>Title</Dialog.Header>);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('does not render close button without onClose', () => {
    render(<Dialog.Header>Title</Dialog.Header>);
    expect(screen.queryByRole('button', { name: 'Close dialog' })).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog.Header onClose={onClose}>Title</Dialog.Header>);
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('merges custom className', () => {
    const { container } = render(<Dialog.Header className="custom">Title</Dialog.Header>);
    expect(container.firstChild).toHaveClass('vega-dialog-header', 'custom');
  });
});

describe('Dialog.Body', () => {
  afterEach(cleanup);

  it('renders children', () => {
    render(<Dialog.Body>Body content</Dialog.Body>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(<Dialog.Body className="custom">x</Dialog.Body>);
    expect(container.firstChild).toHaveClass('vega-dialog-body', 'custom');
  });
});

describe('Dialog.Footer', () => {
  afterEach(cleanup);

  it('renders children', () => {
    render(<Dialog.Footer>Footer content</Dialog.Footer>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    const { container } = render(<Dialog.Footer className="custom">x</Dialog.Footer>);
    expect(container.firstChild).toHaveClass('vega-dialog-footer', 'custom');
  });
});

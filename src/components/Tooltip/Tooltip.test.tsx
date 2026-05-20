import { render, screen, act, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  afterEach(cleanup);

  it('renders the trigger child', () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
  });

  it('does not render the tooltip initially', () => {
    render(
      <Tooltip content="Help">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover after openDelay', () => {
    vi.useFakeTimers();
    try {
      render(
        <Tooltip content="Help text" openDelay={300}>
          <button>Trigger</button>
        </Tooltip>
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      act(() => { vi.advanceTimersByTime(300); });
      expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
    } finally {
      vi.useRealTimers();
    }
  });

  it('hides tooltip on mouse leave', () => {
    vi.useFakeTimers();
    try {
      render(
        <Tooltip content="Help" openDelay={100}>
          <button>Trigger</button>
        </Tooltip>
      );
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      act(() => { vi.advanceTimersByTime(100); });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      fireEvent.mouseLeave(trigger);
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('shows on focus and hides on blur', () => {
    vi.useFakeTimers();
    try {
      render(
        <Tooltip content="Help" openDelay={50}>
          <button>Trigger</button>
        </Tooltip>
      );
      const trigger = screen.getByRole('button');
      fireEvent.focus(trigger);
      act(() => { vi.advanceTimersByTime(50); });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      fireEvent.blur(trigger);
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('toggles on click for click trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Click content" trigger="click">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    await user.click(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Click content');
    await user.click(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on Escape key for click trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help" trigger="click">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('closes on outside pointerdown for click trigger', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Tooltip content="Help" trigger="click">
          <button>Trigger</button>
        </Tooltip>
        <span data-testid="outside">Outside</span>
      </div>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.pointerDown(screen.getByTestId('outside'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens on right-click for contextmenu trigger and prevents default', () => {
    render(
      <Tooltip content="Menu" trigger="contextmenu">
        <button>Trigger</button>
      </Tooltip>
    );
    const notPrevented = fireEvent.contextMenu(screen.getByRole('button'));
    expect(notPrevented).toBe(false);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Menu');
  });

  it('sets aria-describedby on the trigger when open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help" trigger="click">
        <button>Trigger</button>
      </Tooltip>
    );
    const trigger = screen.getByRole('button');
    expect(trigger).not.toHaveAttribute('aria-describedby');
    await user.click(trigger);
    const tooltip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('does not render tooltip when content is empty', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content={null} trigger="click">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('applies custom className to the tooltip box', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help" trigger="click" className="custom-tip">
        <button>Trigger</button>
      </Tooltip>
    );
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('tooltip')).toHaveClass('custom-tip');
  });

  it('respects controlled open prop', () => {
    const { rerender } = render(
      <Tooltip content="Help" open={false}>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    rerender(
      <Tooltip content="Help" open>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('calls onOpenChange in click trigger', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Tooltip content="Help" trigger="click" onOpenChange={onOpenChange}>
        <button>Trigger</button>
      </Tooltip>
    );
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await user.click(screen.getByRole('button'));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("preserves the trigger child's existing onClick handler", async () => {
    const user = userEvent.setup();
    const childClick = vi.fn();
    render(
      <Tooltip content="Help" trigger="click">
        <button onClick={childClick}>Trigger</button>
      </Tooltip>
    );
    await user.click(screen.getByRole('button'));
    expect(childClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
});

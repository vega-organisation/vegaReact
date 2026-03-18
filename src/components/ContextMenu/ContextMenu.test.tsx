import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ContextMenu } from './ContextMenu';

describe('ContextMenu', () => {
  const items = [
    { icon: '📋', label: 'Copy', onClick: vi.fn() },
    { icon: '✂️', label: 'Cut', onClick: vi.fn() },
  ];

  it('renders children', () => {
    render(<ContextMenu>Right click me</ContextMenu>);
    expect(screen.getByText('Right click me')).toBeInTheDocument();
  });

  it('does not show menu items initially', () => {
    render(<ContextMenu items={items}>Content</ContextMenu>);
    expect(screen.queryByText('Copy')).not.toBeInTheDocument();
  });

  it('shows menu items on right click', () => {
    const { container } = render(<ContextMenu items={items}>Content</ContextMenu>);
    fireEvent.contextMenu(screen.getByText('Content'));
    const menuItems = container.querySelectorAll('.context-menu-item');
    expect(menuItems).toHaveLength(2);
    expect(menuItems[0].textContent).toContain('Copy');
    expect(menuItems[1].textContent).toContain('Cut');
  });

  it('does not open when disabled', () => {
    const { container } = render(<ContextMenu items={items} disabled>Content</ContextMenu>);
    fireEvent.contextMenu(screen.getByText('Content'));
    expect(container.querySelectorAll('.context-menu-item')).toHaveLength(0);
  });

  it('applies disabled class', () => {
    const { container } = render(<ContextMenu disabled>Content</ContextMenu>);
    expect(container.firstChild).toHaveClass('disabled');
  });

  it('applies custom className', () => {
    const { container } = render(<ContextMenu className="my-menu">Content</ContextMenu>);
    expect(container.firstChild).toHaveClass('my-menu');
  });

  it('calls item onClick when clicked', () => {
    const onCopy = vi.fn();
    const menuItems = [{ icon: '📋', label: 'Copy', onClick: onCopy }];
    const { container } = render(<ContextMenu items={menuItems}>Content</ContextMenu>);
    fireEvent.contextMenu(screen.getByText('Content'));
    const item = container.querySelector('.context-menu-item')!;
    fireEvent.click(item);
    expect(onCopy).toHaveBeenCalledOnce();
  });

  it('closes on outside click', () => {
    const { container } = render(
      <div>
        <ContextMenu items={items}>Content</ContextMenu>
        <span>Outside</span>
      </div>
    );
    fireEvent.contextMenu(screen.getByText('Content'));
    expect(container.querySelectorAll('.context-menu-item')).toHaveLength(2);
    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(container.querySelectorAll('.context-menu-item')).toHaveLength(0);
  });
});

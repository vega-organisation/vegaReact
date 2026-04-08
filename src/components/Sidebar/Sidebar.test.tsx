import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { Home, Settings } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useSidebarContext } from './SidebarContext';

afterEach(cleanup);

describe('Sidebar', () => {
  it('renders children in all zones', () => {
    render(
      <Sidebar>
        <Sidebar.Header>header-content</Sidebar.Header>
        <Sidebar.Body>body-content</Sidebar.Body>
        <Sidebar.Footer>footer-content</Sidebar.Footer>
      </Sidebar>
    );
    expect(screen.getByText('header-content')).toBeInTheDocument();
    expect(screen.getByText('body-content')).toBeInTheDocument();
    expect(screen.getByText('footer-content')).toBeInTheDocument();
  });

  it('renders as nav with accessible label', () => {
    render(<Sidebar><Sidebar.Body>nav</Sidebar.Body></Sidebar>);
    expect(screen.getByRole('navigation', { name: 'Sidebar navigation' })).toBeInTheDocument();
  });

  it('starts expanded by default', () => {
    render(<Sidebar><Sidebar.Body>content</Sidebar.Body></Sidebar>);
    expect(screen.getByRole('navigation')).toHaveClass('vega-sidebar--expanded');
  });

  it('starts collapsed when defaultExpanded is false', () => {
    render(<Sidebar defaultExpanded={false}><Sidebar.Body>content</Sidebar.Body></Sidebar>);
    expect(screen.getByRole('navigation')).toHaveClass('vega-sidebar--collapsed');
  });

  it('toggles expanded state when Toggle is clicked', () => {
    render(
      <Sidebar>
        <Sidebar.Body>content</Sidebar.Body>
        <Sidebar.Footer><Sidebar.Toggle /></Sidebar.Footer>
      </Sidebar>
    );
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('vega-sidebar--expanded');

    act(() => {
      screen.getByRole('button', { name: 'Collapse sidebar' }).click();
    });
    expect(nav).toHaveClass('vega-sidebar--collapsed');

    act(() => {
      screen.getByRole('button', { name: 'Expand sidebar' }).click();
    });
    expect(nav).toHaveClass('vega-sidebar--expanded');
  });

  it('calls onExpandedChange when toggled', () => {
    const onExpandedChange = vi.fn();
    render(
      <Sidebar onExpandedChange={onExpandedChange}>
        <Sidebar.Footer><Sidebar.Toggle /></Sidebar.Footer>
      </Sidebar>
    );
    act(() => {
      screen.getByRole('button', { name: 'Collapse sidebar' }).click();
    });
    expect(onExpandedChange).toHaveBeenCalledWith(false);
  });

  it('respects controlled expanded prop', () => {
    const { rerender } = render(
      <Sidebar expanded={true}>
        <Sidebar.Body>content</Sidebar.Body>
        <Sidebar.Footer><Sidebar.Toggle /></Sidebar.Footer>
      </Sidebar>
    );
    expect(screen.getByRole('navigation')).toHaveClass('vega-sidebar--expanded');

    rerender(
      <Sidebar expanded={false}>
        <Sidebar.Body>content</Sidebar.Body>
        <Sidebar.Footer><Sidebar.Toggle /></Sidebar.Footer>
      </Sidebar>
    );
    expect(screen.getByRole('navigation')).toHaveClass('vega-sidebar--collapsed');
  });
});

describe('Sidebar.Item', () => {
  it('renders icon and label', () => {
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item icon={<Home data-testid="icon-home" size={20} />} label="Dashboard" />
        </Sidebar.Body>
      </Sidebar>
    );
    expect(screen.getByTestId('icon-home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders as anchor when href is provided', () => {
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item label="Dashboard" href="/dashboard" />
        </Sidebar.Body>
      </Sidebar>
    );
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard');
  });

  it('renders as button when no href', () => {
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item label="Dashboard" />
        </Sidebar.Body>
      </Sidebar>
    );
    expect(screen.getByRole('button', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('marks active item with aria-current="page"', () => {
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item label="Dashboard" href="/dashboard" active />
        </Sidebar.Body>
      </Sidebar>
    );
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('aria-current', 'page');
  });

  it('renders as button with sub-menu even when href is provided', () => {
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item label="Projects" href="/projects" icon={<Settings size={20} />}>
            <Sidebar.SubMenu>
              <Sidebar.Item label="Active" href="#" />
            </Sidebar.SubMenu>
          </Sidebar.Item>
        </Sidebar.Body>
      </Sidebar>
    );
    expect(screen.getByRole('button', { name: /projects/i })).toBeInTheDocument();
  });

  it('opens and closes sub-menu on click', () => {
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item label="Projects" icon={<Settings size={20} />}>
            <Sidebar.SubMenu>
              <Sidebar.Item label="Active" href="#" />
            </Sidebar.SubMenu>
          </Sidebar.Item>
        </Sidebar.Body>
      </Sidebar>
    );

    expect(screen.queryByText('Active')).not.toBeInTheDocument();

    act(() => {
      screen.getByRole('button', { name: /projects/i }).click();
    });
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /projects/i })).toHaveAttribute('aria-expanded', 'true');

    act(() => {
      screen.getByRole('button', { name: /projects/i }).click();
    });
    expect(screen.queryByText('Active')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /projects/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('calls onClick when item is clicked', () => {
    const onClick = vi.fn();
    render(
      <Sidebar>
        <Sidebar.Body>
          <Sidebar.Item label="Dashboard" onClick={onClick} />
        </Sidebar.Body>
      </Sidebar>
    );
    act(() => {
      screen.getByRole('button', { name: /dashboard/i }).click();
    });
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe('useSidebarContext', () => {
  it('throws when used outside Sidebar', () => {
    const Broken = () => {
      useSidebarContext();
      return null;
    };
    expect(() => render(<Broken />)).toThrow('useSidebarContext must be used within <Sidebar>');
  });
});

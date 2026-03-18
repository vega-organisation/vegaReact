import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    expect(container.firstChild).toHaveClass('vega-card--elevated');
  });

  it('uses default variant', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('vega-card--default');
  });

  it('merges custom className', () => {
    const { container } = render(<Card className="custom">Content</Card>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('becomes interactive when onClick is provided', () => {
    const { container } = render(<Card onClick={() => {}}>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('vega-card--interactive');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabindex', '0');
  });

  it('calls onClick on click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Content</Card>);
    await user.click(screen.getByText('Content'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Content</Card>);
    screen.getByText('Content').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('calls onClick on Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Content</Card>);
    screen.getByText('Content').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

describe('Card.Media', () => {
  it('renders an image with src and alt', () => {
    render(<Card.Media src="test.jpg" alt="Test image" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'Test image');
  });

  it('applies ratio class', () => {
    const { container } = render(<Card.Media src="test.jpg" ratio="4/3" />);
    expect(container.firstChild).toHaveClass('vega-card-media--4-3');
  });
});

describe('Card.Header', () => {
  it('renders children', () => {
    render(<Card.Header>Title</Card.Header>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('applies className', () => {
    const { container } = render(<Card.Header className="custom">Title</Card.Header>);
    expect(container.firstChild).toHaveClass('vega-card-header', 'custom');
  });
});

describe('Card.Body', () => {
  it('renders children', () => {
    render(<Card.Body>Body text</Card.Body>);
    expect(screen.getByText('Body text')).toBeInTheDocument();
  });
});

describe('Card.Footer', () => {
  it('renders children', () => {
    render(<Card.Footer>Footer</Card.Footer>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

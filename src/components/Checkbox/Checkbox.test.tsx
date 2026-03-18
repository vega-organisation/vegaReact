import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Checkbox label="Newsletter" description="Weekly updates" />);
    expect(screen.getByText('Weekly updates')).toBeInTheDocument();
  });

  it('applies size class to label', () => {
    render(<Checkbox label="Test" size="large" />);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('vega-checkbox__label--large');
  });

  it('calls onChange with checked state', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Check" onChange={handleChange} />);
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('renders a checkbox input', () => {
    render(<Checkbox label="Test" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('uses default size (small)', () => {
    render(<Checkbox label="Default" />);
    expect(screen.getByText('Default')).toHaveClass('vega-checkbox__label--small');
  });
});

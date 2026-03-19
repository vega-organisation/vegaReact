import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { InputText } from './InputText';

describe('InputText', () => {
  it('renders an input element', () => {
    render(<InputText />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<InputText label="Name" />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<InputText helperText="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('applies error status class', () => {
    render(<InputText status="error" />);
    expect(screen.getByRole('textbox')).toHaveClass('vega-input--error');
  });

  it('applies success status class', () => {
    render(<InputText status="success" />);
    expect(screen.getByRole('textbox')).toHaveClass('vega-input--success');
  });

  it('applies size class', () => {
    render(<InputText size="large" />);
    expect(screen.getByRole('textbox')).toHaveClass('vega-input--large');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<InputText fullWidth />);
    expect(container.firstChild).toHaveClass('vega-input-wrapper--full-width');
  });

  it('can be disabled', () => {
    render(<InputText disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<InputText onChange={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('merges custom className', () => {
    const { container } = render(<InputText className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('uses provided id', () => {
    render(<InputText id="my-input" label="Test" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'my-input');
  });
});

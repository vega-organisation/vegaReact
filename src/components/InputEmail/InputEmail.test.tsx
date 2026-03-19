import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { InputEmail } from './InputEmail';

describe('InputEmail', () => {
  it('renders an email input', () => {
    render(<InputEmail />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<InputEmail label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<InputEmail helperText="We won't share your email" />);
    expect(screen.getByText("We won't share your email")).toBeInTheDocument();
  });

  it('shows error state for invalid email after typing', async () => {
    const user = userEvent.setup();
    render(<InputEmail />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'invalid');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows success state for valid email after typing', async () => {
    const user = userEvent.setup();
    render(<InputEmail />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'test@example.com');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('respects external status override', () => {
    render(<InputEmail status="error" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies size class to container', () => {
    const { container } = render(<InputEmail size="small" />);
    expect(container.querySelector('.vega-field-container')).toHaveClass('vega-field-container--small');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<InputEmail fullWidth />);
    expect(container.firstChild).toHaveClass('vega-field-wrapper--full-width');
  });

  it('can be disabled', () => {
    render(<InputEmail disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('works as controlled input', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<InputEmail value="init@test.com" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('init@test.com');
    await user.type(input, 'x');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows default error message for invalid email', async () => {
    const user = userEvent.setup();
    render(<InputEmail />);
    await user.type(screen.getByRole('textbox'), 'bad');
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('uses provided id', () => {
    render(<InputEmail id="email-field" label="Email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email-field');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PhoneNumberInput } from './PhoneNumberInput';

describe('PhoneNumberInput', () => {
  const defaultProps = {
    onChange: vi.fn(),
    defaultCountry: 'FR' as const,
  };

  it('renders the phone input', () => {
    render(<PhoneNumberInput {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<PhoneNumberInput {...defaultProps} label="Phone" />);
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('renders helper text', () => {
    render(<PhoneNumberInput {...defaultProps} helperText="Include country code" />);
    expect(screen.getByText('Include country code')).toBeInTheDocument();
  });

  it('applies error status class', () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} status="error" />);
    expect(container.firstChild).toHaveClass('vega-phone-wrapper--error');
  });

  it('applies success status class', () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} status="success" />);
    expect(container.firstChild).toHaveClass('vega-phone-wrapper--success');
  });

  it('applies size class', () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} size="large" />);
    expect(container.firstChild).toHaveClass('vega-phone-wrapper--large');
  });

  it('applies fullWidth class', () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} fullWidth />);
    expect(container.firstChild).toHaveClass('vega-phone-wrapper--full-width');
  });

  it('applies disabled class', () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} disabled />);
    expect(container.firstChild).toHaveClass('vega-phone-wrapper--disabled');
  });

  it('merges custom className', () => {
    const { container } = render(<PhoneNumberInput {...defaultProps} className="custom" />);
    expect(container.firstChild).toHaveClass('custom');
  });
});

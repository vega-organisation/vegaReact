import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { InputWrapper } from './InputWrapper';

const renderWithInput = (props: Partial<React.ComponentProps<typeof InputWrapper>> = {}) =>
  render(
    <InputWrapper {...props}>
      <input id={props.inputId} />
    </InputWrapper>
  );

describe('InputWrapper', () => {
  it('renders children', () => {
    renderWithInput();
    expect(document.querySelector('input')).toBeInTheDocument();
  });

  it('renders label when provided', () => {
    renderWithInput({ label: 'My label', inputId: 'test-id' });
    expect(screen.getByText('My label')).toBeInTheDocument();
  });

  it('associates label with input via inputId', () => {
    renderWithInput({ label: 'Name', inputId: 'name-input' });
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders helper text when provided', () => {
    renderWithInput({ helperText: 'Helper message' });
    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('applies error class to container', () => {
    const { container } = renderWithInput({ status: 'error' });
    expect(container.querySelector('.vega-field-container')).toHaveClass('vega-field-container--error');
  });

  it('applies success class to container', () => {
    const { container } = renderWithInput({ status: 'success' });
    expect(container.querySelector('.vega-field-container')).toHaveClass('vega-field-container--success');
  });

  it('applies error color to helper text', () => {
    const { container } = renderWithInput({ status: 'error', helperText: 'Error!' });
    expect(container.querySelector('.vega-field-helper')).toHaveClass('vega-field-helper--error');
  });

  it('applies size class to container', () => {
    const { container } = renderWithInput({ size: 'large' });
    expect(container.querySelector('.vega-field-container')).toHaveClass('vega-field-container--large');
  });

  it('applies fullWidth class to wrapper', () => {
    const { container } = renderWithInput({ fullWidth: true });
    expect(container.firstChild).toHaveClass('vega-field-wrapper--full-width');
  });

  it('applies disabled class to container', () => {
    const { container } = renderWithInput({ disabled: true });
    expect(container.querySelector('.vega-field-container')).toHaveClass('vega-field-container--disabled');
  });

  it('merges custom className on wrapper', () => {
    const { container } = renderWithInput({ className: 'my-custom' });
    expect(container.firstChild).toHaveClass('my-custom');
  });

  it('renders lead icon when provided', () => {
    const { container } = renderWithInput({ leadIcon: <span data-testid="lead">icon</span> });
    expect(container.querySelector('.vega-field-icon-lead')).toBeInTheDocument();
  });

  it('renders trail icon when provided', () => {
    const { container } = renderWithInput({ trailIcon: <span data-testid="trail">icon</span> });
    expect(container.querySelector('.vega-field-icon-trail')).toBeInTheDocument();
  });

  it('does not render trail icon when not provided', () => {
    const { container } = renderWithInput();
    expect(container.querySelector('.vega-field-icon-trail')).not.toBeInTheDocument();
  });

  it('sets helperId on helper paragraph', () => {
    const { container } = renderWithInput({ helperText: 'Help', helperId: 'my-helper' });
    expect(container.querySelector('#my-helper')).toBeInTheDocument();
  });
});

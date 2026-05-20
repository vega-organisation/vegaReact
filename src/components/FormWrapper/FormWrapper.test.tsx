import { render, screen, act, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { FormWrapper } from './FormWrapper';
import { useFormContext } from './useFormContext';

afterEach(cleanup);

const ContextReader = () => {
  const { isSubmitting, isDisabled, error } = useFormContext();
  return (
    <>
      <span data-testid="submitting">{String(isSubmitting)}</span>
      <span data-testid="disabled">{String(isDisabled)}</span>
      <span data-testid="error">{error ?? 'null'}</span>
    </>
  );
};

describe('FormWrapper', () => {
  it('renders children', () => {
    render(
      <FormWrapper onSubmit={() => {}}>
        <span>content</span>
      </FormWrapper>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders as a form element', () => {
    const { container } = render(<FormWrapper onSubmit={() => {}}><input /></FormWrapper>);
    expect(container.querySelector('form')).toBeInTheDocument();
  });

  it('prevents default and calls onSubmit', () => {
    const onSubmit = vi.fn();
    render(
      <FormWrapper onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </FormWrapper>
    );
    act(() => {
      screen.getByRole('button').click();
    });
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  it('does not call onSubmit when isSubmitting', () => {
    const onSubmit = vi.fn();
    render(
      <FormWrapper onSubmit={onSubmit} isSubmitting={true}>
        <button type="submit">Submit</button>
      </FormWrapper>
    );
    act(() => {
      screen.getByRole('button').click();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not call onSubmit when disabled', () => {
    const onSubmit = vi.fn();
    render(
      <FormWrapper onSubmit={onSubmit} disabled={true}>
        <button type="submit">Submit</button>
      </FormWrapper>
    );
    act(() => {
      screen.getByRole('button').click();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('sets aria-busy when isSubmitting', () => {
    const { container } = render(<FormWrapper onSubmit={() => {}} isSubmitting={true}><input /></FormWrapper>);
    expect(container.querySelector('form')).toHaveAttribute('aria-busy', 'true');
  });

  it('shows overlay when isSubmitting', () => {
    const { container } = render(
      <FormWrapper onSubmit={() => {}} isSubmitting={true}><input /></FormWrapper>
    );
    expect(container.querySelector('.vega-form__overlay')).toBeInTheDocument();
  });

  it('does not show overlay when not submitting', () => {
    const { container } = render(
      <FormWrapper onSubmit={() => {}}><input /></FormWrapper>
    );
    expect(container.querySelector('.vega-form__overlay')).not.toBeInTheDocument();
  });

  it('shows error summary when error prop is set', () => {
    render(
      <FormWrapper onSubmit={() => {}} error="Something went wrong">
        <input />
      </FormWrapper>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('does not show error summary without error prop', () => {
    render(<FormWrapper onSubmit={() => {}}><input /></FormWrapper>);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('applies gap class', () => {
    const { container } = render(
      <FormWrapper onSubmit={() => {}} gap="lg"><input /></FormWrapper>
    );
    expect(container.querySelector('.vega-form--gap-lg')).toBeInTheDocument();
  });

  it('applies default gap-md class', () => {
    const { container } = render(
      <FormWrapper onSubmit={() => {}}><input /></FormWrapper>
    );
    expect(container.querySelector('.vega-form--gap-md')).toBeInTheDocument();
  });
});

describe('FormContext', () => {
  it('provides default context values to children', () => {
    render(
      <FormWrapper onSubmit={() => {}}>
        <ContextReader />
      </FormWrapper>
    );
    expect(screen.getByTestId('submitting').textContent).toBe('false');
    expect(screen.getByTestId('disabled').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('null');
  });

  it('propagates isSubmitting to context', () => {
    render(
      <FormWrapper onSubmit={() => {}} isSubmitting={true}>
        <ContextReader />
      </FormWrapper>
    );
    expect(screen.getByTestId('submitting').textContent).toBe('true');
    expect(screen.getByTestId('disabled').textContent).toBe('true');
  });

  it('propagates disabled to context', () => {
    render(
      <FormWrapper onSubmit={() => {}} disabled={true}>
        <ContextReader />
      </FormWrapper>
    );
    expect(screen.getByTestId('disabled').textContent).toBe('true');
  });

  it('propagates error to context', () => {
    render(
      <FormWrapper onSubmit={() => {}} error="Auth failed">
        <ContextReader />
      </FormWrapper>
    );
    expect(screen.getByTestId('error').textContent).toBe('Auth failed');
  });
});

describe('useFormContext', () => {
  it('throws when used outside FormWrapper', () => {
    const Broken = () => {
      useFormContext();
      return null;
    };
    expect(() => render(<Broken />)).toThrow('useFormContext must be used within a <FormWrapper>');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from './Loader';

describe('Loader', () => {
  describe('spinner variant', () => {
    it('renders a spinner by default', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('uses custom label', () => {
      render(<Loader label="Please wait" />);
      expect(screen.getByLabelText('Please wait')).toBeInTheDocument();
    });
  });

  describe('skeleton variant', () => {
    it('renders a skeleton', () => {
      render(<Loader variant="skeleton" />);
      expect(screen.getByRole('status')).toHaveAttribute('aria-busy', 'true');
    });

    it('applies custom width and height', () => {
      render(<Loader variant="skeleton" width="200px" height="40px" />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveStyle({ width: '200px', height: '40px' });
    });
  });

  describe('progress variant', () => {
    it('renders a progressbar', () => {
      render(<Loader variant="progress" value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('sets aria-valuenow', () => {
      render(<Loader variant="progress" value={75} />);
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
    });

    it('handles indeterminate state', () => {
      render(<Loader variant="progress" />);
      expect(screen.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
    });
  });

  describe('overlay', () => {
    it('renders overlay wrapper', () => {
      const { container } = render(<Loader overlay />);
      expect(container.querySelector('.vega-loader-overlay')).toBeInTheDocument();
    });

    it('has aria-busy on overlay', () => {
      const { container } = render(<Loader overlay />);
      expect(container.querySelector('.vega-loader-overlay')).toHaveAttribute('aria-busy', 'true');
    });
  });

  it('merges custom className', () => {
    const { container } = render(<Loader className="custom" />);
    expect(container.querySelector('.vega-loader')).toHaveClass('custom');
  });
});

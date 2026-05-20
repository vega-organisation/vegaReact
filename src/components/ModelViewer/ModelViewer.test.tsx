import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { ModelViewer } from './ModelViewer';

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ className }: { className?: string }) => (
    <div data-testid="r3f-canvas" className={className} />
  ),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  Bounds: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  Environment: () => null,
  OrbitControls: () => null,
  useGLTF: () => ({ scene: {} }),
  useProgress: () => ({ active: false, progress: 100, errors: [], item: '', loaded: 0, total: 0 }),
}));

describe('ModelViewer', () => {
  it('renders the wrapper element', () => {
    const { container } = render(<ModelViewer src="model.glb" />);
    expect(container.querySelector('.vega-model-viewer')).toBeInTheDocument();
  });

  it('applies a custom className', () => {
    const { container } = render(
      <ModelViewer src="model.glb" className="my-viewer" />,
    );
    expect(container.querySelector('.vega-model-viewer')).toHaveClass('my-viewer');
  });

  it('applies width and height as inline styles', () => {
    const { container } = render(
      <ModelViewer src="model.glb" width={500} height={300} />,
    );
    const wrapper = container.querySelector('.vega-model-viewer') as HTMLElement;
    expect(wrapper.style.width).toBe('500px');
    expect(wrapper.style.height).toBe('300px');
  });

  it('renders the canvas element', () => {
    const { getByTestId } = render(<ModelViewer src="model.glb" />);
    expect(getByTestId('r3f-canvas')).toBeInTheDocument();
  });

  it('hides the loading overlay when not active', () => {
    const { container } = render(<ModelViewer src="model.glb" />);
    expect(container.querySelector('.vega-model-viewer__overlay')).toBeNull();
  });

  it('uses transparent background by default', () => {
    const { container } = render(<ModelViewer src="model.glb" />);
    const wrapper = container.querySelector('.vega-model-viewer') as HTMLElement;
    expect(wrapper.style.background).toBe('transparent');
  });
});

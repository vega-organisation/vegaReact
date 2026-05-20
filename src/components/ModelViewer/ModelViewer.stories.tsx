import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModelViewer } from './ModelViewer';
import type { ModelViewerEnvironment } from './ModelViewer.types';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Card } from '../Card';

const SAMPLE_MODEL =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';

const meta: Meta<typeof ModelViewer> = {
  title: 'Components/ModelViewer',
  component: ModelViewer,
  parameters: { layout: 'centered' },
  argTypes: {
    environment: {
      control: 'select',
      options: [
        'studio',
        'city',
        'sunset',
        'warehouse',
        'forest',
        'apartment',
        'park',
        'lobby',
        'night',
        'dawn',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModelViewer>;

export const Default: Story = {
  args: {
    src: SAMPLE_MODEL,
    width: 480,
    height: 360,
  },
};

export const AutoRotate: Story = {
  args: {
    src: SAMPLE_MODEL,
    width: 480,
    height: 360,
    autoRotate: true,
    autoRotateSpeed: 1.5,
  },
};

export const MouseParallax: Story = {
  args: {
    src: SAMPLE_MODEL,
    width: 480,
    height: 360,
    mouseParallax: true,
    mouseParallaxIntensity: 0.3,
    orbit: false,
    zoom: false,
  },
};

export const RotatedAndScaled: Story = {
  args: {
    src: SAMPLE_MODEL,
    width: 480,
    height: 360,
    rotation: [0, 45, 0],
    scale: 1.2,
  },
};

export const SunsetEnvironment: Story = {
  args: {
    src: SAMPLE_MODEL,
    width: 480,
    height: 360,
    environment: 'sunset',
    background: '#1a0f2e',
  },
};

export const NoControls: Story = {
  args: {
    src: SAMPLE_MODEL,
    width: 480,
    height: 360,
    orbit: false,
    zoom: false,
    pan: false,
  },
};

const ENVIRONMENTS: ModelViewerEnvironment[] = [
  'studio',
  'city',
  'sunset',
  'warehouse',
  'night',
  'dawn',
];

function Playground() {
  const [orbit, setOrbit] = useState(true);
  const [zoom, setZoom] = useState(true);
  const [pan, setPan] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [parallax, setParallax] = useState(false);
  const [environment, setEnvironment] = useState<ModelViewerEnvironment>('studio');
  const [scale, setScale] = useState(1);
  const [rotationY, setRotationY] = useState(0);

  const reset = () => {
    setOrbit(true);
    setZoom(true);
    setPan(false);
    setAutoRotate(false);
    setParallax(false);
    setEnvironment('studio');
    setScale(1);
    setRotationY(0);
  };

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <ModelViewer
        src={SAMPLE_MODEL}
        width={480}
        height={360}
        orbit={orbit}
        zoom={zoom}
        pan={pan}
        autoRotate={autoRotate}
        mouseParallax={parallax}
        mouseParallaxIntensity={0.3}
        environment={environment}
        scale={scale}
        rotation={[0, rotationY, 0]}
      />

      <Card variant="elevated" style={{ width: 280 }}>
        <Card.Header>
          <strong>3D Playground</strong>
        </Card.Header>

        <Card.Body>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <section>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                Interactions
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Checkbox
                  label="Orbit"
                  checked={orbit}
                  onChange={(e) => setOrbit(e.target.checked)}
                />
                <Checkbox
                  label="Zoom"
                  checked={zoom}
                  onChange={(e) => setZoom(e.target.checked)}
                />
                <Checkbox
                  label="Pan"
                  checked={pan}
                  onChange={(e) => setPan(e.target.checked)}
                />
                <Checkbox
                  label="Auto-rotate"
                  checked={autoRotate}
                  onChange={(e) => setAutoRotate(e.target.checked)}
                />
                <Checkbox
                  label="Mouse parallax"
                  checked={parallax}
                  onChange={(e) => setParallax(e.target.checked)}
                />
              </div>
            </section>

            <section>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                Environment
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ENVIRONMENTS.map((env) => (
                  <Button
                    key={env}
                    size="small"
                    variant={environment === env ? 'primary' : 'secondary'}
                    onClick={() => setEnvironment(env)}
                  >
                    {env}
                  </Button>
                ))}
              </div>
            </section>

            <section>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                Scale: {scale.toFixed(2)}×
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => setScale((s) => Math.max(0.25, s - 0.25))}
                >
                  −
                </Button>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => setScale((s) => Math.min(4, s + 0.25))}
                >
                  +
                </Button>
              </div>
            </section>

            <section>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                Rotation Y: {rotationY}°
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => setRotationY((r) => r - 45)}
                >
                  − 45°
                </Button>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => setRotationY((r) => r + 45)}
                >
                  + 45°
                </Button>
              </div>
            </section>

            <Button variant="danger" size="small" fullWidth onClick={reset}>
              Reset
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export const InteractivePlayground: Story = {
  parameters: { layout: 'padded' },
  render: () => <Playground />,
};

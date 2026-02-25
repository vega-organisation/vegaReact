import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { Loader } from './Loader';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'skeleton', 'progress'],
      description: 'Visual variant of the loader',
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0–100). progress variant only. Omit for indeterminate.',
    },
    overlay: {
      control: 'boolean',
      description: 'Full-screen overlay mode',
    },
    label: {
      control: 'text',
      description: 'Accessible label (visually hidden)',
    },
    width: {
      control: 'text',
      description: 'Width of the skeleton (e.g. "200px"). skeleton variant only.',
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (e.g. "1rem"). skeleton variant only.',
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spinner: Story = {
  args: { variant: 'spinner' },
};

export const SkeletonLine: Story = {
  args: {
    variant: 'skeleton',
    width: '240px',
    height: '1rem',
  },
};

export const SkeletonCard: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '280px' }}>
      <Loader variant="skeleton" width="100%" height="160px" />
      <Loader variant="skeleton" width="60%" height="1rem" />
      <Loader variant="skeleton" width="100%" height="0.875rem" />
      <Loader variant="skeleton" width="80%" height="0.875rem" />
    </div>
  ),
};

export const ProgressDeterminate: Story = {
  args: {
    variant: 'progress',
    value: 65,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ProgressIndeterminate: Story = {
  args: { variant: 'progress' },
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ProgressAnimated: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => {
          setValue((v) => (v >= 100 ? 0 : v + 2));
        }, 80);
        return () => clearInterval(interval);
      }, []);
      return <Loader variant="progress" value={value} />;
    };
    return <Demo />;
  },
};

export const OverlaySpinner: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div style={{ padding: '2rem' }}>
          <button
            style={{
              padding: '0.625rem 1.25rem',
              background: '#6d28d9',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onClick={() => {
              setOpen(true);
              setTimeout(() => setOpen(false), 2500);
            }}
          >
            Trigger overlay (2.5s)
          </button>
          {open && <Loader variant="spinner" overlay />}
        </div>
      );
    };
    return <Demo />;
  },
};

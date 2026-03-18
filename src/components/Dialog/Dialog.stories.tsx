import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from './Dialog';
import type { DialogSize } from './Dialog.types';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'fullscreen'],
      description: 'Width variant of the dialog panel',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close when clicking the backdrop',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const OpenButton = ({ label = 'Open dialog', onClick }: { label?: string; onClick: () => void }) => (
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
    onClick={onClick}
  >
    {label}
  </button>
);

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <OpenButton onClick={() => setOpen(true)} />
          <Dialog open={open} onClose={() => setOpen(false)}>
            <Dialog.Header onClose={() => setOpen(false)}>Confirm action</Dialog.Header>
            <Dialog.Body>
              Are you sure you want to delete this item? This action cannot be undone.
            </Dialog.Body>
            <Dialog.Footer>
              <button
                style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setOpen(false)}
              >
                Delete
              </button>
            </Dialog.Footer>
          </Dialog>
        </>
      );
    };
    return <Demo />;
  },
};

export const Sizes: Story = {
  render: () => {
    const Demo = () => {
      const [size, setSize] = useState<DialogSize | null>(null);
      const sizes: DialogSize[] = ['sm', 'md', 'lg', 'fullscreen'];
      return (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {sizes.map((s) => (
              <OpenButton key={s} label={`Open ${s}`} onClick={() => setSize(s)} />
            ))}
          </div>
          <Dialog open={size !== null} onClose={() => setSize(null)} size={size ?? 'md'}>
            <Dialog.Header onClose={() => setSize(null)}>
              Size: <code>{size}</code>
            </Dialog.Header>
            <Dialog.Body>
              This dialog uses the <strong>{size}</strong> size variant.
            </Dialog.Body>
            <Dialog.Footer>
              <button
                style={{ padding: '0.5rem 1rem', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setSize(null)}
              >
                Close
              </button>
            </Dialog.Footer>
          </Dialog>
        </>
      );
    };
    return <Demo />;
  },
};

export const WithForm: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <OpenButton label="Edit profile" onClick={() => setOpen(true)} />
          <Dialog open={open} onClose={() => setOpen(false)} size="md">
            <Dialog.Header onClose={() => setOpen(false)}>Edit profile</Dialog.Header>
            <Dialog.Body>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Full name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    style={{ padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    style={{ padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                  />
                </div>
              </div>
            </Dialog.Body>
            <Dialog.Footer>
              <button
                style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', background: '#fff' }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{ padding: '0.5rem 1rem', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setOpen(false)}
              >
                Save changes
              </button>
            </Dialog.Footer>
          </Dialog>
        </>
      );
    };
    return <Demo />;
  },
};

export const NoBackdropClose: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <OpenButton label="Open (backdrop locked)" onClick={() => setOpen(true)} />
          <Dialog open={open} onClose={() => setOpen(false)} closeOnBackdrop={false}>
            <Dialog.Header onClose={() => setOpen(false)}>Backdrop locked</Dialog.Header>
            <Dialog.Body>
              Clicking outside won't close this dialog. Use the × button or Escape key.
            </Dialog.Body>
            <Dialog.Footer>
              <button
                style={{ padding: '0.5rem 1rem', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </Dialog.Footer>
          </Dialog>
        </>
      );
    };
    return <Demo />;
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastProvider } from './Toast';
import { useToast } from './useToast';
import type { ToastVariant, ToastPosition } from './Toast.types';

// Neutral component used as story entry point — ToastProvider is applied via decorators
const ToastDemo = () => null;
ToastDemo.displayName = 'Toast';

const meta = {
  title: 'Components/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerButton = ({
  variant,
  title,
  message,
  duration,
}: {
  variant: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}) => {
  const { add } = useToast();
  return (
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
      onClick={() => add({ variant, title, message, duration })}
    >
      Show {variant} toast
    </button>
  );
};

export const Success: Story = {
  render: () => (
    <TriggerButton variant="success" title="Saved!" message="Your changes have been saved." />
  ),
};

export const Error: Story = {
  render: () => (
    <TriggerButton variant="error" title="Error" message="Something went wrong. Please try again." />
  ),
};

export const Warning: Story = {
  render: () => (
    <TriggerButton variant="warning" message="Your session will expire in 5 minutes." />
  ),
};

export const Info: Story = {
  render: () => (
    <TriggerButton variant="info" message="A new version is available." />
  ),
};

export const NoDismiss: Story = {
  render: () => (
    <TriggerButton
      variant="info"
      title="Persistent"
      message="This toast won't auto-dismiss. Close it manually."
      duration={0}
    />
  ),
};

export const Stacked: Story = {
  render: () => {
    const Demo = () => {
      const { add } = useToast();
      return (
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
            add({ variant: 'success', message: 'Profile updated.' });
            add({ variant: 'error', title: 'Upload failed', message: 'File size exceeds 5MB.' });
            add({ variant: 'warning', message: 'Storage almost full.' });
            add({ variant: 'info', message: 'New message received.' });
          }}
        >
          Show all toasts
        </button>
      );
    };
    return <Demo />;
  },
};

const positions: ToastPosition[] = [
  'top-right',
  'top-left',
  'top-center',
  'bottom-right',
  'bottom-left',
  'bottom-center',
];

const PositionButton = ({ position }: { position: ToastPosition }) => {
  const { add } = useToast();
  return (
    <button
      style={{
        padding: '0.5rem 1rem',
        background: '#6d28d9',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
      onClick={() => add({ variant: 'info', message: `Position: ${position}`, duration: 2500 })}
    >
      {position}
    </button>
  );
};

export const AllPositions: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        padding: '2rem',
        justifyContent: 'center',
      }}
    >
      {positions.map((pos) => (
        <ToastProvider key={pos} position={pos}>
          <PositionButton position={pos} />
        </ToastProvider>
      ))}
    </div>
  ),
};

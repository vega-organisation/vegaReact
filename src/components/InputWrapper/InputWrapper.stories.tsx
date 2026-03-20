import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputWrapper } from './InputWrapper';

const StoryInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    style={{
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: 0,
      fontSize: 'inherit',
      color: 'inherit',
      minWidth: 0,
    }}
    {...props}
  />
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="3.5" width="13" height="9" rx="1" stroke="currentColor" strokeWidth="1.25" />
    <path d="M1.5 5.5L8 9.5L14.5 5.5" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
    <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 11V11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'Components/InputWrapper',
  component: InputWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual validation state of the field',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the field container',
    },
    label: { control: 'text', description: 'Label displayed above the field' },
    helperText: { control: 'text', description: 'Helper or error text below the field' },
    fullWidth: { control: 'boolean', description: 'Expand to full container width' },
    disabled: { control: 'boolean', description: 'Disabled state' },
  },
} satisfies Meta<typeof InputWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputWrapper inputId="s-default">
      <StoryInput id="s-default" placeholder="Enter text..." />
    </InputWrapper>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <InputWrapper label="Full name" inputId="s-label">
      <StoryInput id="s-label" placeholder="John Doe" />
    </InputWrapper>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <InputWrapper label="Username" helperText="Must be at least 3 characters." inputId="s-helper">
      <StoryInput id="s-helper" placeholder="username" />
    </InputWrapper>
  ),
};

export const Error: Story = {
  render: () => (
    <InputWrapper
      label="Email"
      status="error"
      helperText="Please enter a valid email address."
      inputId="s-error"
    >
      <StoryInput id="s-error" defaultValue="not-an-email" />
    </InputWrapper>
  ),
};

export const Success: Story = {
  render: () => (
    <InputWrapper
      label="Email"
      status="success"
      helperText="Email address is valid."
      inputId="s-success"
    >
      <StoryInput id="s-success" defaultValue="john@example.com" />
    </InputWrapper>
  ),
};

export const WithLeadIcon: Story = {
  render: () => (
    <InputWrapper label="Email" leadIcon={<MailIcon />} inputId="s-lead">
      <StoryInput id="s-lead" type="email" placeholder="exemple@email.com" />
    </InputWrapper>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <InputWrapper
      label="Email"
      status="success"
      leadIcon={<MailIcon />}
      trailIcon={<CheckIcon />}
      inputId="s-both"
    >
      <StoryInput id="s-both" type="email" defaultValue="john@example.com" />
    </InputWrapper>
  ),
};

export const WithErrorIcon: Story = {
  render: () => (
    <InputWrapper
      label="Email"
      status="error"
      helperText="Please enter a valid email address."
      leadIcon={<MailIcon />}
      trailIcon={<ErrorIcon />}
      inputId="s-error-icon"
    >
      <StoryInput id="s-error-icon" type="email" defaultValue="bad-email" />
    </InputWrapper>
  ),
};

export const Small: Story = {
  render: () => (
    <InputWrapper label="Field" size="small" inputId="s-small">
      <StoryInput id="s-small" placeholder="Small" />
    </InputWrapper>
  ),
};

export const Large: Story = {
  render: () => (
    <InputWrapper label="Field" size="large" inputId="s-large">
      <StoryInput id="s-large" placeholder="Large" />
    </InputWrapper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputWrapper label="Field" disabled inputId="s-disabled">
      <StoryInput id="s-disabled" defaultValue="Disabled value" disabled />
    </InputWrapper>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <InputWrapper label="Field" fullWidth inputId="s-full">
      <StoryInput id="s-full" placeholder="Full width" />
    </InputWrapper>
  ),
  parameters: {
    layout: 'padded',
  },
};

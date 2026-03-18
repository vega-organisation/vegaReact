import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { InputEmail } from './InputEmail';
import type { InputEmailProps } from './InputEmail.types';

const meta = {
  title: 'Components/InputEmail',
  component: InputEmail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Override the validation status',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the input',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper or error text displayed below the input',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to full container width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof InputEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'exemple@email.com',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'exemple@email.com',
  },
};

export const Error: Story = {
  args: {
    label: 'Email address',
    value: 'not-an-email',
    status: 'error',
  },
};

export const ErrorWithCustomMessage: Story = {
  args: {
    label: 'Email address',
    value: 'not-an-email',
    status: 'error',
    helperText: 'This email is already in use.',
  },
};

export const Success: Story = {
  args: {
    label: 'Email address',
    value: 'john.doe@example.com',
    status: 'success',
    helperText: 'Email address is valid.',
  },
};

export const Small: Story = {
  args: {
    label: 'Email address',
    size: 'small',
    placeholder: 'exemple@email.com',
  },
};

export const Medium: Story = {
  args: {
    label: 'Email address',
    size: 'medium',
    placeholder: 'exemple@email.com',
  },
};

export const Large: Story = {
  args: {
    label: 'Email address',
    size: 'large',
    placeholder: 'exemple@email.com',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Email address',
    placeholder: 'exemple@email.com',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email address',
    value: 'john.doe@example.com',
    disabled: true,
  },
};

const InteractiveInputEmail = (args: InputEmailProps) => {
  const [value, setValue] = useState('');
  return (
    <InputEmail
      {...args}
      label="Email address"
      placeholder="exemple@email.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveInputEmail {...args} />,
};

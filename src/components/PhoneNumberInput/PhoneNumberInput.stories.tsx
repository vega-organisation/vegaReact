import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { PhoneNumberInput } from "./PhoneNumberInput";
import type { PhoneNumberInputProps } from "./PhoneNumberInput.types";

// Configuration globale (Meta)
const meta = {
  title: "Components/PhoneNumberInput",
  component: PhoneNumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["normal", "error", "success"], 
      description: "Validation status of the input",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the input",
    },
    defaultCountry: {
      control: "text",
      description: "Default country ISO code (e.g. FR, US)",
    },
    label: {
      control: "text",
      description: "Text label above the input",
    },
    helperText: {
      control: "text",
      description: "Helper text below the input",
    },
    fullWidth: {
      control: "boolean",
      description: "Input with full width",
    },
    disabled: {
      control: "boolean",
      description: "Disabled input",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const RenderWithState = (args: PhoneNumberInputProps) => {
  const [value, setValue] = useState(args.value);
  
  return (
    <PhoneNumberInput 
      {...args} 
      value={value} 
      onChange={(newVal) => {
        setValue(newVal);
        args.onChange?.(newVal);
      }} 
    />
  );
};

export const Default: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Phone Number",
    placeholder: "Ex: +33 6 12 34 56 78",
    defaultCountry: "FR",
  },
};

export const WithHelperText: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Contact",
    helperText: "We will never share your number.",
    defaultCountry: "US",
  },
};

export const Error: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Emergency Contact",
    status: "error",
    value: "+33600", 
    helperText: "Please enter a valid phone number.",
  },
};

export const Success: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Verified Number",
    status: "success",
    value: "+33612345678",
    helperText: "Phone number verified !",
  },
};

export const Disabled: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Disabled Input",
    value: "+33612345678",
    disabled: true,
  },
};

export const FullWidth: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Full Width Input",
    fullWidth: true,
    placeholder: "I take the full width",
  },
  parameters: {
    layout: "padded",
  },
};

export const International: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "International Format (UK)",
    defaultCountry: "GB",
    placeholder: "Enter UK number",
  },
};
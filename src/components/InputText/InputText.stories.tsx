import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { InputText } from "./InputText";

const meta = {
  title: "Components/InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Status of the input",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the input",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search"],
      description: "Type of the input",
    },
    label: {
      control: "text",
      description: "Text label above the input",
    },
    helperText: {
      control: "text",
      description: "Error or helper text below the input",
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
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Ex: John Doe",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    helperText: "Have to be at least 8 characters.",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    value: "email@invalid",
    status: "error",
    helperText: "Please enter a valid email address.",
  },
};

export const Success: Story = {
  args: {
    label: "Email",
    value: "john.doe@example.com",
    status: "success",
    helperText: "Email valid !",
  },
};

export const Small: Story = {
  args: {
    label: "Small Input",
    size: "small",
    placeholder: "Small",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium Input",
    size: "medium",
    placeholder: "Medium",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    size: "large",
    placeholder: "Large",
  },
};

export const FullWidth: Story = {
  args: {
    label: "Full Width Input",
    placeholder: "I take the full width of my container",
    fullWidth: true,
  },
  parameters: {
    
    layout: "padded", 
  },
};

export const Disabled: Story = {
  args: {
    label: "Input désactivé",
    value: "Disabled input",
    disabled: true,
  },
};
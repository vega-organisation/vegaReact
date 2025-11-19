import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputPhoneNumber } from "./InputPhoneNumber";
import { useState } from "react";

const meta = {
  title: "Components/InputPhoneNumber",
  component: InputPhoneNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "La taille du champ",
    },
    disabled: {
      control: "boolean",
      description: "Désactive le champ",
    },
    success: {
      control: "boolean",
      description: "Indique une validation réussie",
    },
    fullWidth: {
      control: "boolean",
      description: "Champ en pleine largeur",
    },
    label: {
      control: "text",
      description: "Le label du champ",
    },
    placeholder: {
      control: "text",
      description: "Le texte placeholder",
    },
    error: {
      control: "text",
      description: "Message d'erreur",
    },
    helperText: {
      control: "text",
      description: "Texte d'aide contextuelle",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof InputPhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper pour gérer l'état dans Storybook
const ControlledInput = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return <InputPhoneNumber {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: ControlledInput,
  args: {
    placeholder: "Numéro de téléphone",
    value: "",
  },
};

export const WithLabel: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    placeholder: "+33 6 12 34 56 78",
    value: "",
  },
};

export const WithValue: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "+33 6 12 34 56 78",
  },
};

export const WithError: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "123",
    error: "Le numéro de téléphone est invalide",
  },
};

export const WithSuccess: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "+33 6 12 34 56 78",
    success: true,
  },
};

export const WithHelperText: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    helperText: "Format : +33 6 12 34 56 78",
    value: "",
  },
};

export const WithIconLeft: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    iconLeft: "📞",
    value: "",
  },
};

export const WithIconRight: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    iconRight: "✓",
    value: "+33 6 12 34 56 78",
    success: true,
  },
};

export const WithBothIcons: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    iconLeft: "📞",
    iconRight: "✓",
    value: "+33 6 12 34 56 78",
    success: true,
  },
};

export const Small: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone (Small)",
    size: "sm",
    value: "+33 6 12 34 56 78",
  },
};

export const Medium: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone (Medium)",
    size: "md",
    value: "+33 6 12 34 56 78",
  },
};

export const Large: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone (Large)",
    size: "lg",
    value: "+33 6 12 34 56 78",
  },
};

export const Disabled: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "+33 6 12 34 56 78",
    disabled: true,
  },
};

export const FullWidth: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "+33 6 12 34 56 78",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const ErrorWithIcon: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "123",
    error: "Le numéro de téléphone est invalide",
    iconRight: "❌",
  },
};

export const SuccessWithIcon: Story = {
  render: ControlledInput,
  args: {
    label: "Téléphone",
    value: "+33 6 12 34 56 78",
    success: true,
    iconRight: "✓",
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox.types";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Taille de la checkbox",
    },
    label: {
      control: "text",
      description: "Label affiché à côté de la checkbox",
    },
    description: {
      control: "text",
      description: "Texte descriptif sous la checkbox",
    },
    error: {
      control: "text",
      description: "Message d'erreur affiché sous la checkbox",
    },
    indeterminate: {
      control: "boolean",
      description: "État indéterminé (sélection partielle)",
    },
    disabled: {
      control: "boolean",
      description: "Désactiver la checkbox",
    },
    fullWidth: {
      control: "boolean",
      description: "Étendre à la largeur du conteneur",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accepter les conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Option activée",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Sélection partielle",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Option indisponible",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Option validée (non modifiable)",
    disabled: true,
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "S'abonner à la newsletter",
    description: "Vous recevrez un e-mail par semaine maximum.",
  },
};

export const WithError: Story = {
  args: {
    label: "Accepter les conditions",
    error: "Vous devez cocher cette case pour continuer.",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Checkbox {...args} size="small" label="Petite (Small)" />
      <Checkbox {...args} size="medium" label="Moyenne (Medium)" />
      <Checkbox {...args} size="large" label="Grande (Large)" />
    </div>
  ),
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <Checkbox {...args} label="Default" />
      <Checkbox {...args} label="Checked" defaultChecked />
      <Checkbox {...args} label="Indeterminate" indeterminate />
      <Checkbox {...args} label="Disabled" disabled />
      <Checkbox {...args} label="Disabled Checked" disabled defaultChecked />
      <Checkbox {...args} label="Error" error="Ce champ est requis." />
      <Checkbox
        {...args}
        label="With description"
        description="Texte descriptif complémentaire."
      />
    </div>
  ),
};

const InteractiveCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      label={checked ? "Activé" : "Désactivé"}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
};

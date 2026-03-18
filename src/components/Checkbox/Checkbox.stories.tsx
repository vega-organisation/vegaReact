import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    onChange: () => {},
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accepter les conditions",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: "Option activée",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Option indisponible",
    disabled: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Sélection partielle",
    indeterminate: true,
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

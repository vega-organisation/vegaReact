import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenu } from "./ContextMenu";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The content of the context menu.",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "null" },
      },
    },
    className: {
      control: { type: "text" },
      description: "Custom CSS class for the component.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the context menu.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "onClick",
      description: "Function called when the context menu is clicked.",
      table: {
        type: { summary: "(event: React.MouseEvent) => void" },
        defaultValue: { summary: "null" },
      },
    },
    items: {
      control: { type: "object" },
      description: "List of items in the context menu.",
      table: {
        type: {
          summary:
            "Array<{icon: string, label: string, onClick: (event: React.MouseEvent) => void}>",
        },
        defaultValue: { summary: "null" },
      },
    },
  },
  args: {
    children: "Right-click me",
  },
} satisfies Meta<typeof ContextMenu>;

export default meta;

export const Default: StoryObj<typeof ContextMenu> = {
  args: {
    children: (
      <div style={{ backgroundColor: "#000", padding: "20px", color: "#fff" }}>
        <Button variant="primary">Right-click me</Button>
      </div>
    ),
    onClick: () => alert("context menu clicked"),
  },
};

export const WithItems: StoryObj<typeof ContextMenu> = {
  args: {
    children: (
      <div style={{ backgroundColor: "#000", padding: "20px", color: "#fff" }}>
        <Button variant="primary">Right-click me</Button>
      </div>
    ),
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
};

export const Disabled: StoryObj<typeof ContextMenu> = {
  args: {
    children: "Right-click me",
    disabled: true,
  },
};

export const CustomClassName: StoryObj<typeof ContextMenu> = {
  args: {
    children: "Right-click me",
    className: "custom-context-menu",
  },
};

export const WithTooltipButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: (
      <Button
        onClick={() =>
          alert(
            "Tooltip: Right-click on this button to see the context menu options.",
          )
        }
      >
        Right-click me
      </Button>
    ),
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a button as the context menu trigger. Right-click on the button to see the context menu options.",
      },
    },
  },
};

export const WithPrimaryButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: <Button variant="primary">Right-click me</Button>,
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a primary button as the context menu trigger.",
      },
    },
  },
};

export const WithSecondaryButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: <Button variant="secondary">Right-click me</Button>,
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a secondary button as the context menu trigger.",
      },
    },
  },
};

export const WithDangerButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: <Button variant="danger">Right-click me</Button>,
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a danger button as the context menu trigger.",
      },
    },
  },
};

export const WithSuccessButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: <Button variant="success">Right-click me</Button>,
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a success button as the context menu trigger.",
      },
    },
  },
};

export const WithSmallButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: <Button size="small">Right-click me</Button>,
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a small button as the context menu trigger.",
      },
    },
  },
};

export const WithLargeButton: StoryObj<typeof ContextMenu> = {
  args: {
    children: <Button size="large">Right-click me</Button>,
    items: [
      { icon: "📄", label: "Open", onClick: () => alert("Open") },
      { icon: "✏️", label: "Edit", onClick: () => alert("Edit") },
      { icon: "🗑️", label: "Delete", onClick: () => alert("Delete") },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example shows how to use a large button as the context menu trigger.",
      },
    },
  },
};

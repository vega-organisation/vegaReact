import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outlined"],
      description: "La variante de la carte",
    },
    padding: {
      control: "select",
      options: ["none", "small", "medium", "large"],
      description: "Padding interne de la carte",
    },
    imageRatio: {
      control: "select",
      options: ["16:9", "1:1", "4:3"],
      description: "Ratio de l'image d'en-tête",
    },
    selected: {
      control: "boolean",
      description: "Carte sélectionnée",
    },
    disabled: {
      control: "boolean",
      description: "Carte désactivée",
    },
    title: {
      control: "text",
      description: "Titre de la carte",
    },
    subtitle: {
      control: "text",
      description: "Sous-titre de la carte",
    },
    headerImage: {
      control: "text",
      description: "URL de l'image d'en-tête",
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Card Title",
    subtitle: "This is a subtitle",
    children: "This is the content of the card. It can contain any React elements.",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    title: "Outlined Card",
    subtitle: "Card with border, no shadow",
    children: "Content for the outlined card variant.",
  },
};

export const Interactive: Story = {
  args: {
    title: "Interactive Card",
    subtitle: "Click me!",
    children: "This card is clickable and has hover effects.",
    onClick: () => alert("Card clicked!"),
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Image",
    subtitle: "16:9 aspect ratio",
    headerImage: "https://via.placeholder.com/800x450",
    children: "This card has a header image with 16:9 ratio.",
  },
};

export const SquareImage: Story = {
  args: {
    title: "Square Image Card",
    subtitle: "1:1 aspect ratio",
    headerImage: "https://via.placeholder.com/600x600",
    imageRatio: "1:1",
    children: "This card has a square header image.",
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    title: "Selected Card",
    subtitle: "This card is selected",
    children: "Card in selected state with blue border.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    title: "Disabled Card",
    subtitle: "This card is disabled",
    children: "Card in disabled state with reduced opacity.",
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "small",
    title: "Small Padding",
    subtitle: "Compact spacing",
    children: "This card has small padding.",
  },
};

export const LargePadding: Story = {
  args: {
    padding: "large",
    title: "Large Padding",
    subtitle: "Spacious layout",
    children: "This card has large padding for more breathing room.",
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    title: "No Padding",
    subtitle: "Edge-to-edge content",
    children: "This card has no padding in the content area.",
  },
};

export const CompleteExample: Story = {
  args: {
    title: "Complete Card Example",
    subtitle: "All features combined",
    headerImage: "https://via.placeholder.com/800x450",
    imageRatio: "16:9",
    padding: "medium",
    onClick: () => alert("Card clicked!"),
    children: (
      <>
        <p style={{ margin: "0 0 1rem 0" }}>
          This is a complete example showing all features of the Card component.
        </p>
        <button
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            alert("Button clicked!");
          }}
        >
          Action Button
        </button>
      </>
    ),
  },
};

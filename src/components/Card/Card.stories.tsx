import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./Card";

// SVG inline pour les tests
const placeholderImage16x9 = `data:image/svg+xml,%3Csvg width='800' height='450' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='450' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236b7280'%3E16:9 Image%3C/text%3E%3C/svg%3E`;

const placeholderImageSquare = `data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='600' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236b7280'%3E1:1 Image%3C/text%3E%3C/svg%3E`;

const placeholderImage4x3 = `data:image/svg+xml,%3Csvg width='800' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='800' height='600' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%236b7280'%3E4:3 Image%3C/text%3E%3C/svg%3E`;

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
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    title: "Outlined Card",
    subtitle: "Card with border, no shadow",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
};

export const Interactive: Story = {
  args: {
    title: "Interactive Card",
    subtitle: "Click me!",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    onClick: () => alert("Card clicked!"),
  },
};

export const WithImage: Story = {
  args: {
    title: "Card with Image",
    subtitle: "16:9 aspect ratio",
    headerImage: placeholderImage16x9,
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
  },
};

export const SquareImage: Story = {
  args: {
    title: "Square Image Card",
    subtitle: "1:1 aspect ratio",
    headerImage: placeholderImageSquare,
    imageRatio: "1:1",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.",
  },
};

export const Image4x3: Story = {
  args: {
    title: "4:3 Image Card",
    subtitle: "4:3 aspect ratio",
    headerImage: placeholderImage4x3,
    imageRatio: "4:3",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    title: "Selected Card",
    subtitle: "This card is selected",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    title: "Disabled Card",
    subtitle: "This card is disabled",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  },
};

export const SmallPadding: Story = {
  args: {
    padding: "small",
    title: "Small Padding",
    subtitle: "Compact spacing",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
  },
};

export const LargePadding: Story = {
  args: {
    padding: "large",
    title: "Large Padding",
    subtitle: "Spacious layout",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.",
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    title: "No Padding",
    subtitle: "Edge-to-edge content",
    children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
  },
};

export const CompleteExample: Story = {
  args: {
    title: "Complete Card Example",
    subtitle: "All features combined",
    headerImage: placeholderImage16x9,
    imageRatio: "16:9",
    padding: "medium",
    onClick: () => alert("Card clicked!"),
    children: (
      <>
        <p style={{ margin: "0 0 1rem 0" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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

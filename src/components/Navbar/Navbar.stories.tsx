import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";
import { Search } from "lucide-react";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#6d28d9' }}>VEGA</div>,
    items: [
      { label: "Dashboard", href: "#", isActive: true },
      { label: "Projects", href: "#" },
      { label: "Tasks", href: "#" },
      { label: "Calendar", href: "#" },
    ],
    userMenu: {
      userName: "John Doe",
      menuItems: [
        { label: "Profile", onClick: () => alert("Profile clicked") },
        { label: "Settings", href: "#settings" },
        { label: "Logout", onClick: () => alert("Logout clicked") },
      ]
    }
  },
};

export const WithCustomContent: Story = {
  args: {
    ...Default.args,
    children: (
      <div style={{ marginLeft: '24px', display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '4px 12px', borderRadius: '6px' }}>
        <Search size={16} color="#6b7280" />
        <input 
          placeholder="Search..." 
          style={{ border: 'none', background: 'transparent', marginLeft: '8px', outline: 'none', fontSize: '14px' }} 
        />
      </div>
    )
  }
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    ...Default.args,
  },
};

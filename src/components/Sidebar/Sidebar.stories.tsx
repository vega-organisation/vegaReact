import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { LayoutDashboard, Users, FolderOpen, Calendar, Settings, HelpCircle, LogOut } from "lucide-react";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const SidebarWithHooks = (args: any) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      <Sidebar 
        {...args} 
        isOpenMobile={isOpenMobile} 
        onOpenMobile={() => setIsOpenMobile(true)}
        onCloseMobile={() => setIsOpenMobile(false)} 
      />
      <main style={{ flex: 1, padding: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Main Content Area</h1>
        <p style={{ marginTop: '16px', color: '#6b7280' }}>
          On mobile, click the burger button to open the sidebar.
        </p>
      </main>
    </div>
  );
};

export const Default: Story = {
  args: {
    logo: <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6d28d9' }}>V</div>,
    showMobileTrigger: true,
    items: [
      { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "#", isActive: true },
      { 
        label: "Team", 
        icon: <Users size={20} />, 
        children: [
          { label: "Overview", href: "#overview" },
          { label: "Members", href: "#members" },
          { label: "Invitations", href: "#invites" },
        ]
      },
      { label: "Projects", icon: <FolderOpen size={20} />, href: "#projects" },
      { label: "Calendar", icon: <Calendar size={20} />, href: "#calendar" },
      { label: "Settings", icon: <Settings size={20} />, href: "#settings" },
    ],
    footer: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button className="vega-sidebar-item">
          <HelpCircle size={20} />
          <span>Support</span>
        </button>
        <button className="vega-sidebar-item" style={{ color: '#ef4444' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    )
  },
  render: (args) => <SidebarWithHooks {...args} />
};

export const Collapsed: Story = {
  args: {
    ...Default.args,
    defaultCollapsed: true,
  },
  render: (args) => <SidebarWithHooks {...args} />
};

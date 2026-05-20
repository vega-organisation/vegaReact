import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
    {children}
    <main style={{ flex: 1, padding: '40px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Main Content Area</h1>
      <p style={{ marginTop: '16px', color: '#6b7280' }}>
        Use the toggle button to collapse / expand the sidebar.
      </p>
    </main>
  </div>
);

export const Default: Story = {
  render: () => (
    <Layout>
      <Sidebar>
        <Sidebar.Header>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6d28d9' }}>V</div>
          <Sidebar.Toggle />
        </Sidebar.Header>
        <Sidebar.Body>
          <Sidebar.Item icon={<LayoutDashboard size={20} />} label="Dashboard" href="#" active />
          <Sidebar.Item icon={<Users size={20} />} label="Team">
            <Sidebar.SubMenu>
              <Sidebar.Item label="Overview" href="#overview" />
              <Sidebar.Item label="Members" href="#members" />
              <Sidebar.Item label="Invitations" href="#invites" />
            </Sidebar.SubMenu>
          </Sidebar.Item>
          <Sidebar.Item icon={<FolderOpen size={20} />} label="Projects" href="#projects" />
          <Sidebar.Item icon={<Calendar size={20} />} label="Calendar" href="#calendar" />
          <Sidebar.Item icon={<Settings size={20} />} label="Settings" href="#settings" />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Item icon={<HelpCircle size={20} />} label="Support" href="#support" />
          <Sidebar.Item icon={<LogOut size={20} />} label="Logout" onClick={() => alert('Logout')} />
        </Sidebar.Footer>
      </Sidebar>
    </Layout>
  ),
};

export const DefaultCollapsed: Story = {
  render: () => (
    <Layout>
      <Sidebar defaultExpanded={false}>
        <Sidebar.Header>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6d28d9' }}>V</div>
          <Sidebar.Toggle />
        </Sidebar.Header>
        <Sidebar.Body>
          <Sidebar.Item icon={<LayoutDashboard size={20} />} label="Dashboard" href="#" active />
          <Sidebar.Item icon={<Users size={20} />} label="Team" href="#team" />
          <Sidebar.Item icon={<FolderOpen size={20} />} label="Projects" href="#projects" />
          <Sidebar.Item icon={<Settings size={20} />} label="Settings" href="#settings" />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Item icon={<LogOut size={20} />} label="Logout" />
        </Sidebar.Footer>
      </Sidebar>
    </Layout>
  ),
};

const ControlledSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Layout>
      <Sidebar expanded={expanded} onExpandedChange={setExpanded}>
        <Sidebar.Header>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#6d28d9' }}>V</div>
          <Sidebar.Toggle />
        </Sidebar.Header>
        <Sidebar.Body>
          <Sidebar.Item icon={<LayoutDashboard size={20} />} label="Dashboard" href="#" active />
          <Sidebar.Item icon={<Settings size={20} />} label="Settings" href="#settings" />
        </Sidebar.Body>
      </Sidebar>
    </Layout>
  );
};

export const Controlled: Story = {
  render: () => <ControlledSidebar />,
};

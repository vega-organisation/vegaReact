import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, BarChart, FolderOpen, Bell, User, Settings, HelpCircle } from 'lucide-react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const NavItems = () => (
  <>
    <Sidebar.Item icon={<Home size={20} />} label="Dashboard" href="#" active />
    <Sidebar.Item icon={<BarChart size={20} />} label="Analytics" href="#" />
    <Sidebar.Item icon={<FolderOpen size={20} />} label="Projects">
      <Sidebar.SubMenu>
        <Sidebar.Item label="Active" href="#" />
        <Sidebar.Item label="Archived" href="#" />
      </Sidebar.SubMenu>
    </Sidebar.Item>
    <Sidebar.Item icon={<Bell size={20} />} label="Notifications" href="#" />
  </>
);

export const Expanded: Story = {
  render: () => (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Sidebar defaultExpanded={true}>
        <Sidebar.Header>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Vega</span>
        </Sidebar.Header>
        <Sidebar.Body>
          <NavItems />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Item icon={<User size={20} />} label="Profile" href="#" />
          <Sidebar.Item icon={<Settings size={20} />} label="Settings" href="#" />
          <Sidebar.Toggle />
        </Sidebar.Footer>
      </Sidebar>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Sidebar defaultExpanded={false}>
        <Sidebar.Header>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>V</span>
        </Sidebar.Header>
        <Sidebar.Body>
          <NavItems />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Item icon={<User size={20} />} label="Profile" href="#" />
          <Sidebar.Toggle />
        </Sidebar.Footer>
      </Sidebar>
    </div>
  ),
};

export const WithSubMenu: Story = {
  render: () => (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Sidebar defaultExpanded={true}>
        <Sidebar.Header>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Vega</span>
        </Sidebar.Header>
        <Sidebar.Body>
          <Sidebar.Item icon={<Home size={20} />} label="Dashboard" href="#" active />
          <Sidebar.Item icon={<FolderOpen size={20} />} label="Projects">
            <Sidebar.SubMenu>
              <Sidebar.Item label="Active" href="#" active />
              <Sidebar.Item label="Archived" href="#" />
              <Sidebar.Item label="Templates" href="#" />
            </Sidebar.SubMenu>
          </Sidebar.Item>
          <Sidebar.Item icon={<Settings size={20} />} label="Settings">
            <Sidebar.SubMenu>
              <Sidebar.Item label="General" href="#" />
              <Sidebar.Item label="Security" href="#" />
            </Sidebar.SubMenu>
          </Sidebar.Item>
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Item icon={<User size={20} />} label="John Doe" href="#" />
          <Sidebar.Toggle />
        </Sidebar.Footer>
      </Sidebar>
    </div>
  ),
};

const ControlledDemo = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 999,
          padding: '0.5rem 1rem',
          background: '#6d28d9',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Toggle from outside
      </button>
      <Sidebar expanded={expanded} onExpandedChange={setExpanded}>
        <Sidebar.Header>
          <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Vega</span>
        </Sidebar.Header>
        <Sidebar.Body>
          <Sidebar.Item icon={<Home size={20} />} label="Dashboard" href="#" active />
          <Sidebar.Item icon={<HelpCircle size={20} />} label="Help" href="#" />
        </Sidebar.Body>
        <Sidebar.Footer>
          <Sidebar.Toggle />
        </Sidebar.Footer>
      </Sidebar>
    </div>
  );
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

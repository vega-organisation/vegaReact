import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HoverTop: Story = {
  args: {
    trigger: 'hover',
    placement: 'top',
    content: 'Tooltip on top',
    children: <Button>Hover me</Button>,
  },
};

export const HoverBottom: Story = {
  args: {
    trigger: 'hover',
    placement: 'bottom',
    content: 'Tooltip on bottom',
    children: <Button>Hover me</Button>,
  },
};

export const HoverLeft: Story = {
  args: {
    trigger: 'hover',
    placement: 'left',
    content: 'Tooltip on left',
    children: <Button>Hover me</Button>,
  },
};

export const HoverRight: Story = {
  args: {
    trigger: 'hover',
    placement: 'right',
    content: 'Tooltip on right',
    children: <Button>Hover me</Button>,
  },
};

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    placement: 'top',
    content: 'Click again or press Escape to close',
    children: <Button>Click me</Button>,
  },
};

export const HoverAndClick: Story = {
  args: {
    trigger: 'both',
    placement: 'top',
    content: 'Hover or left-click to toggle',
    children: <Button>Hover or click</Button>,
  },
};

export const ContextMenuTrigger: Story = {
  args: {
    trigger: 'contextmenu',
    placement: 'right',
    content: 'Right-click (context menu) to toggle',
    children: <Button>Right-click me</Button>,
  },
};


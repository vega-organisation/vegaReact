import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'interactive'],
      description: 'Visual style variant',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const PLACEHOLDER = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

const cardStyle = { width: '320px' };

export const Default: Story = {
  render: (args) => (
    <div style={cardStyle}>
      <Card {...args} variant="default">
        <Card.Header>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#111827' }}>Card title</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Subtitle or metadata</p>
          </div>
        </Card.Header>
        <Card.Body>
          This is the card body. You can put any content here — text, images, components.
        </Card.Body>
        <Card.Footer>
          <button style={{ padding: '0.5rem 1rem', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem' }}>
            Action
          </button>
        </Card.Footer>
      </Card>
    </div>
  ),
  args: { onClick: undefined },
};

export const Elevated: Story = {
  render: () => (
    <div style={cardStyle}>
      <Card variant="elevated">
        <Card.Media src={PLACEHOLDER} alt="Mountain landscape" ratio="16/9" />
        <Card.Header>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#111827' }}>Elevated card</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Hover to see shadow deepen</p>
          </div>
        </Card.Header>
        <Card.Body>
          Elevated cards use box shadows to create depth. The shadow deepens on hover.
        </Card.Body>
      </Card>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div style={cardStyle}>
      <Card variant="outlined">
        <Card.Body>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#111827', marginBottom: '0.5rem' }}>Outlined card</p>
          <p style={{ margin: 0, fontSize: '0.9375rem', color: '#374151' }}>
            A minimal card with a 2px border and no shadow. Great for dense UIs.
          </p>
        </Card.Body>
        <Card.Footer>
          <span style={{ fontSize: '0.8125rem', color: '#6b7280' }}>Feb 25, 2026</span>
        </Card.Footer>
      </Card>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={cardStyle}>
      <Card variant="interactive" onClick={() => alert('Card clicked!')}>
        <Card.Media src={PLACEHOLDER} alt="Mountain landscape" ratio="16/9" />
        <Card.Header>
          <div>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '1rem', color: '#111827' }}>Interactive card</p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Hover me ✦</p>
          </div>
        </Card.Header>
        <Card.Body>
          Hover to see the lift + image zoom + shine overlay. Click or press Enter/Space.
        </Card.Body>
      </Card>
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 320px)', gap: '1.5rem' }}>
      {(['default', 'elevated', 'outlined', 'interactive'] as const).map((variant) => (
        <Card key={variant} variant={variant} onClick={variant === 'interactive' ? () => {} : undefined}>
          <Card.Media src={PLACEHOLDER} alt="" ratio="16/9" />
          <Card.Header>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: '#111827' }}>{variant}</p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Variant preview</p>
            </div>
          </Card.Header>
          <Card.Body>Card content for the <strong>{variant}</strong> variant.</Card.Body>
          <Card.Footer>
            <button style={{ padding: '0.375rem 0.75rem', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8125rem' }}>
              See more
            </button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Card variant="elevated">
        <Card.Media src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" alt="Profile" ratio="1/1" />
        <Card.Body>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '1.125rem', color: '#111827' }}>Alex Martin</p>
          <p style={{ margin: '0.25rem 0 0.75rem', fontSize: '0.875rem', color: '#6d28d9' }}>Senior Designer</p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.6 }}>
            Crafting beautiful interfaces and design systems.
          </p>
        </Card.Body>
        <Card.Footer>
          <button style={{ flex: 1, padding: '0.5rem', background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem' }}>
            Follow
          </button>
          <button style={{ flex: 1, padding: '0.5rem', background: 'transparent', color: '#6d28d9', border: '1px solid #6d28d9', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem' }}>
            Message
          </button>
        </Card.Footer>
      </Card>
    </div>
  ),
};

export const MediaRatios: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {(['16/9', '4/3', '1/1', '3/4'] as const).map((ratio) => (
        <div key={ratio} style={{ width: '200px' }}>
          <Card variant="outlined">
            <Card.Media src={PLACEHOLDER} alt="" ratio={ratio} />
            <Card.Body>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: '#111827' }}>{ratio}</p>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  ),
};

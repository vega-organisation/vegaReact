import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormWrapper } from './FormWrapper';
import { useFormContext } from './useFormContext';
import { InputText } from '../InputText/InputText';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/FormWrapper',
  component: FormWrapper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    onSubmit: () => {},
    children: null,
  },
} satisfies Meta<typeof FormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const ContextBadge = () => {
  const { isSubmitting, isDisabled } = useFormContext();
  return (
    <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
      submitting: {String(isSubmitting)} | disabled: {String(isDisabled)}
    </p>
  );
};

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [submitted, setSubmitted] = useState(false);
      return (
        <div style={{ width: 360 }}>
          <FormWrapper onSubmit={() => setSubmitted(true)}>
            <InputText label="Email" placeholder="you@example.com" fullWidth />
            <InputText label="Password" type="password" placeholder="••••••••" fullWidth />
            <Button type="submit" fullWidth>Se connecter</Button>
            {submitted && <p style={{ color: 'green', margin: 0, fontSize: '0.875rem' }}>Formulaire soumis !</p>}
            <ContextBadge />
          </FormWrapper>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Submitting: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <FormWrapper onSubmit={() => {}} isSubmitting={true}>
        <InputText label="Email" placeholder="you@example.com" fullWidth />
        <InputText label="Password" type="password" placeholder="••••••••" fullWidth />
        <Button type="submit" fullWidth disabled>Se connecter</Button>
        <ContextBadge />
      </FormWrapper>
    </div>
  ),
  args: { onSubmit: () => {} },
};

export const WithGlobalError: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <FormWrapper onSubmit={() => {}} error="Identifiants incorrects. Veuillez réessayer.">
        <InputText label="Email" placeholder="you@example.com" fullWidth status="error" />
        <InputText label="Password" type="password" placeholder="••••••••" fullWidth status="error" />
        <Button type="submit" fullWidth>Se connecter</Button>
        <ContextBadge />
      </FormWrapper>
    </div>
  ),
  args: { onSubmit: () => {} },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <FormWrapper onSubmit={() => {}} disabled={true}>
        <InputText label="Email" placeholder="you@example.com" fullWidth disabled />
        <InputText label="Password" type="password" placeholder="••••••••" fullWidth disabled />
        <Button type="submit" fullWidth disabled>Se connecter</Button>
        <ContextBadge />
      </FormWrapper>
    </div>
  ),
  args: { onSubmit: () => {} },
};

export const GapVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      {(['sm', 'md', 'lg'] as const).map((gap) => (
        <div key={gap} style={{ width: 220 }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>gap={gap}</p>
          <FormWrapper onSubmit={() => {}} gap={gap}>
            <InputText label="Nom" placeholder="Jean" fullWidth />
            <InputText label="Prénom" placeholder="Dupont" fullWidth />
            <Button type="submit" fullWidth>Envoyer</Button>
          </FormWrapper>
        </div>
      ))}
    </div>
  ),
  args: { onSubmit: () => {} },
};

import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    code: { control: 'text' },
    language: { control: 'text' },
    label: { control: 'text' },
    showLineNumbers: { control: 'boolean' },
    showCopyButton: { control: 'boolean' },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCode = `function helloWorld() {
  console.log("Hello, world!");
  return true;
}

const result = helloWorld();
console.log(result);`;

export const Default: Story = {
  args: {
    code: sampleCode,
  },
};

export const WithLanguage: Story = {
  args: {
    code: sampleCode,
    language: 'javascript',
  },
};

export const WithLabel: Story = {
  args: {
    code: sampleCode,
    language: 'javascript',
    label: 'hello.js',
  },
};

export const WithLineNumbers: Story = {
  args: {
    code: sampleCode,
    language: 'javascript',
    showLineNumbers: true,
  },
};

export const LightMode: Story = {
  args: {
    code: sampleCode,
    variant: 'light',
  },
};

export const LightModeWithHeader: Story = {
  args: {
    code: sampleCode,
    variant: 'light',
    language: 'javascript',
    label: 'main.js',
    showLineNumbers: true,
  },
};

export const Editable: Story = {
  args: {
    code: sampleCode,
    isEditable: true,
    language: 'javascript',
    label: 'editable.js',
  },
};

export const EditableLight: Story = {
  args: {
    code: sampleCode,
    isEditable: true,
    variant: 'light',
    language: 'javascript',
    label: 'editable-light.js',
  },
};

export const LongCode: Story = {
  args: {
    code: Array(20).fill(sampleCode).join('\n\n'),
    language: 'javascript',
    showLineNumbers: true,
    label: 'long-script.js',
  },
};

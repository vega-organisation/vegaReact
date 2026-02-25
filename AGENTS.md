# AGENTS.md — vegaReact

Guide for AI agents contributing to this project. Read this before making any changes.

---

## Project Overview

**vegaReact** is a React component library distributed as an npm package. It ships dual-format bundles (ESM + CJS) and TypeScript declarations. Documentation is provided via Storybook.

- **Stack**: React 19, TypeScript 5.9, Vite 7, Storybook 10
- **Package entry**: `src/index.ts` → `dist/`
- **Docs**: `npm run storybook` (port 6006)

---

## Commands

```bash
npm run storybook        # Start Storybook dev server
npm run build            # TypeScript check + build library
npm run lint             # ESLint
npm run knip             # Detect unused exports/files
```

> CI runs these in order: knip → lint → build. All three must pass before a PR can be merged.

---

## Component Structure

Every component lives in `src/components/<ComponentName>/` and must include these 5 files:

```
src/components/MyComponent/
├── MyComponent.tsx        # Component implementation
├── MyComponent.types.ts   # Props interface
├── MyComponent.css        # Scoped styles
├── MyComponent.stories.tsx # Storybook stories
└── index.ts               # Barrel export
```

### index.ts pattern

```ts
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent.types';
```

### Registering a new component

After creating the 5 files, add exports to `src/index.ts`:

```ts
export { MyComponent } from './components/MyComponent';
export type { MyComponentProps } from './components/MyComponent/MyComponent.types';
```

---

## Component Conventions

### Props interface

```ts
// MyComponent.types.ts
import type { HTMLAttributes } from 'react';

export interface MyComponentProps extends HTMLAttributes<HTMLElement> {
  // Extend the appropriate HTML element attributes
  // Add component-specific props below
  label?: ReactNode;
  status?: 'default' | 'error' | 'success';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}
```

### Implementation pattern

```tsx
// MyComponent.tsx
import './MyComponent.css';
import { useId } from 'react';
import type { MyComponentProps } from './MyComponent.types';

export function MyComponent({
  label,
  status = 'default',
  size = 'medium',
  fullWidth = false,
  className,
  disabled,
  ...props
}: MyComponentProps) {
  const id = useId();

  const wrapperClass = [
    'mycomponent',
    `mycomponent--${size}`,
    `mycomponent--${status}`,
    fullWidth ? 'mycomponent--full-width' : '',
    disabled ? 'mycomponent--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {/* ... */}
    </div>
  );
}
```

Key rules:
- Use `useId()` for any label/input association or ARIA attributes
- Default size: `'medium'`, default status: `'default'`
- Spread `...props` onto the root HTML element
- Use `.filter(Boolean).join(' ')` for dynamic class names
- Add ARIA attributes when relevant (`aria-invalid`, `aria-describedby`, etc.)

---

## Design Tokens

All tokens are defined in `src/assets/styles/tokens.css` and imported globally. Always use these CSS variables instead of hardcoded values.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#6d28d9` | Primary actions |
| `--color-secondary` | `#e5e7eb` | Secondary actions |
| `--color-error` | `#ef4444` | Error states |
| `--color-success` | `#22c55e` | Success states |
| `--bg-surface` | `#ffffff` | Component backgrounds |
| `--bg-disabled` | `#f3f4f6` | Disabled backgrounds |
| `--text-main` | `#111827` | Primary text |
| `--text-secondary` | `#9ca3af` | Secondary text / placeholders |
| `--text-inverse` | `#ffffff` | Text on dark backgrounds |
| `--border-default` | `#d1d5db` | Default borders |
| `--border-focus` | `#111827` | Focus state borders |
| `--border-error` | `#ef4444` | Error state borders |
| `--border-success` | `#22c55e` | Success state borders |

### Typography tokens (from `src/assets/styles/typography.css`)

Font sizes: `--text-xs` (12px) `--text-sm` (14px) `--text-base` (16px) `--text-md` (18px) `--text-lg` (20px) `--text-xl` (24px)

Font weights: `--font-light` (300) `--font-normal` (400) `--font-medium` (500) `--font-semibold` (600) `--font-bold` (700)

---

## CSS Conventions

- One CSS file per component, co-located with the component
- Use BEM-style class naming: `.mycomponent`, `.mycomponent--variant`, `.mycomponent__element`
- Size variants: `--small`, `--medium`, `--large`
- Status variants: `--default`, `--error`, `--success`
- State variants: `--disabled`, `--full-width`
- Use `:focus-visible` (not `:focus`) for keyboard focus styles
- Use `transition` for hover/focus animations (typically `0.2s ease`)

---

## Storybook Stories Pattern

```tsx
// MyComponent.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MyComponent } from './MyComponent';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { /* ... */ },
};
```

- Always include stories for: all variants, all sizes, disabled state, full-width
- For stateful components (controlled inputs), wrap with a `RenderWithState` helper (see `PhoneNumberInput.stories.tsx` for reference)
- Use `fn()` from `@storybook/test` for event callbacks

---

## Icons

The library uses **Lucide React** for icons. Import directly from the package:

```tsx
import { ArrowDown, Info } from 'lucide-react';
```

Do not add custom SVG icons — use Lucide. See `src/components/Icons/Icons.mdx` for documentation.

---

## TypeScript Rules

The config enforces strict mode with `noUnusedLocals` and `noUnusedParameters`. Key constraints:
- No unused imports or variables — the build will fail
- No `any` types without justification
- Use `type` imports for type-only imports (required by `verbatimModuleSyntax`)
- `erasableSyntaxOnly: true` — no `const enum` or legacy decorators

---

## CI Pipeline

PRs to `main` trigger this chain:

1. **Knip** — detects unused files, exports, and types (`npm run knip`)
2. **ESLint** — linting with TS + React rules (`npm run lint`)
3. **Build** — builds Storybook to verify compilation (`npm run build-storybook`)

All three must pass. The workflows use `npm install --legacy-peer-deps`.

---

## Existing Components

| Component | Variants | Sizes | Status support |
|-----------|----------|-------|----------------|
| `Button` | primary, secondary, danger, success | small, medium, large | No |
| `InputText` | — | small, medium, large | normal, error, success |
| `PhoneNumberInput` | — | small, medium, large | default, error, success |

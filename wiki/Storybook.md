# Storybook

Storybook is our live documentation and visual playground. Every component must have a `<Component>.stories.tsx` file alongside it.

We use **Storybook 10** with the **Vite** builder.

## Running Storybook

```bash
npm run storybook         # Dev server on http://localhost:6006
npm run build-storybook   # Static build (run by CI as the final check)
```

## File location

Stories live next to the component:

```
src/components/Button/
├── Button.tsx
├── Button.stories.tsx   ← here
└── ...
```

## Story file structure

### Imports

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { MyComponent } from "./MyComponent";
```

> Use `@storybook/react-vite` for the type imports (not `@storybook/react`) and `storybook/test` for `fn` (the spy used in `args`).

### Meta

```tsx
const meta = {
  title: "Components/MyComponent",     // Folder path in the sidebar
  component: MyComponent,
  parameters: { layout: "centered" },  // or "fullscreen", "padded"
  tags: ["autodocs"],                  // Generates the auto Docs page
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description: "Visual style",
    },
    fullWidth: {
      control: "boolean",
      description: "Stretch to fill width",
    },
  },
  args: { onClick: fn() },             // Default spy for all stories
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Stories

```tsx
export const Default: Story = {
  args: { children: "Click me", variant: "primary" },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};
```

## Required coverage

For every component, ship stories for:

- All `variant`s
- All `size`s
- Disabled state
- Full-width (if applicable)
- Status states (error / success), if the component has them
- Any composition (sub-components used together — e.g. `Card.Media` + `Card.Body`)

## Controlled components — the `RenderWithState` pattern

For inputs that need a controlled `value`/`onChange` (so the user can actually interact with them in Storybook), wrap with a small local component:

```tsx
const RenderWithState = (args: PhoneNumberInputProps) => {
  const [value, setValue] = useState(args.value);

  return (
    <PhoneNumberInput
      {...args}
      value={value}
      onChange={(newVal) => {
        setValue(newVal);
        args.onChange?.(newVal);  // Still call the spy from `args` for Storybook's Actions panel
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <RenderWithState {...args} />,
  args: {
    label: "Phone",
    defaultCountry: "FR",
  },
};
```

See `PhoneNumberInput.stories.tsx` for a complete example.

## Preview config

Global styles and design tokens load in `.storybook/preview.ts`:

```ts
import '../src/assets/styles/tokens.css';
import '../src/assets/styles/typography.css';
```

This means stories render with the same CSS tokens as the published library — no extra setup per story.

## Autodocs

`tags: ["autodocs"]` on the meta generates a Docs page automatically from your `argTypes` and JSDoc comments on the `Props` interface. Keep those comments accurate — they show up in the docs panel.

## Tips

- **Spy with `fn()` from `storybook/test`** for default handlers in `args`. Calls show up in the Actions panel.
- **Don't import `@storybook/test`** unless the installed `@storybook` package matches that version (note in `AGENTS.md`). Stick to `storybook/test` for now.
- **`layout: 'centered'`** is the default choice for small components. Use `'fullscreen'` for layout-level components (Sidebar, Navbar, Dialog).
- **Use `argTypes.control`** to give nicer controls in the Storybook UI (`select`, `boolean`, `text`, `color`, etc.).

## See also

- [Testing](Testing) — unit tests
- [Contributing](Contributing) — required stories per component
- [Architecture](Architecture) — design tokens loaded by `preview.ts`

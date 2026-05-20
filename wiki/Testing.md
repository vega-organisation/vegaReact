# Testing

The project uses **Vitest** + **@testing-library/react** in a **happy-dom** environment. Every component should ship with a `*.test.tsx` covering its main behaviors.

## Setup

Config lives in `vitest.config.ts`:

```ts
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,                                    // describe/it/expect available globally
    environment: 'happy-dom',                         // fast, lightweight DOM
    setupFiles: '@testing-library/jest-dom/vitest',   // adds toBeInTheDocument, toHaveClass, etc.
    css: true,                                        // include component CSS in tests
  },
});
```

## Running tests

```bash
npm test            # Run once (used by CI)
npm run test:watch  # Watch mode for local development
```

## File location & naming

Tests live **next to** the component, named `<Component>.test.tsx`:

```
src/components/Button/
├── Button.tsx
├── Button.test.tsx   ← here
└── ...
```

## What to test

Cover the contract a consumer relies on. For a typical component:

- Renders children / content
- Applies expected class for each `variant`, `size`, `status`
- Applies `fullWidth`, `disabled`, and other boolean modifiers
- Forwards `className` (custom class merging)
- Fires user handlers (`onClick`, `onChange`, etc.)
- Respects `disabled` (handler not called)
- ARIA attributes when relevant (`aria-invalid`, `aria-describedby`)

For complex behavior (Dialog, Tooltip), also cover:
- Focus management (focus trap, restoration)
- Keyboard interactions (Escape, Tab, Shift+Tab)
- Body scroll lock / unlock
- Backdrop / outside click

## Pattern — basic component test

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('vega-button--danger');
  });

  it('calls onClick handler', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

## Pattern — userEvent over fireEvent

Use `userEvent.setup()` (async) rather than `fireEvent`. It simulates the full event sequence (`pointerdown` → `pointerup` → `click`) and matches real-world behavior.

```tsx
const user = userEvent.setup();
await user.click(element);
await user.type(input, 'hello');
await user.keyboard('{Escape}');
await user.tab();
```

## Pattern — fake timers (only when needed)

Scope fake timers to the tests that actually need them (animations, delays):

```tsx
it('restores focus after exit animation', () => {
  vi.useFakeTimers();
  // ... open dialog, close dialog
  vi.advanceTimersByTime(250); // animation duration
  // assert focus restored
  vi.useRealTimers();
});
```

Most tests should stay on real timers + `userEvent` (which handles async cleanly).

## Pattern — mocking heavy dependencies

For components that pull in expensive runtime deps (e.g. three.js in `ModelViewer`), mock them at the top of the test file:

```tsx
// ModelViewer.test.tsx
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ className }: { className?: string }) => (
    <div data-testid="r3f-canvas" className={className} />
  ),
  useFrame: vi.fn(),
}));

vi.mock('@react-three/drei', () => ({
  Bounds: ({ children }) => <>{children}</>,
  Environment: () => null,
  OrbitControls: () => null,
  useGLTF: () => ({ scene: {} }),
  useProgress: () => ({ active: false, progress: 100, errors: [], item: '', loaded: 0, total: 0 }),
}));
```

This lets you verify the DOM wrapper logic without actually running WebGL.

## Pattern — `{ hidden: true }` queries

`@testing-library` ignores elements with `aria-hidden="true"` by default. If a parent is hidden (e.g. Dialog backdrop), descendants are unreachable via standard queries — even when they themselves have `aria-hidden="false"`. Pass `{ hidden: true }`:

```tsx
const closeButton = screen.getByRole('button', { name: /close/i, hidden: true });
```

This is a real accessibility quirk (`aria-hidden` is not "un-hidable" on descendants), but in tests it's the pragmatic escape hatch. See `Dialog.test.tsx` for usage.

## What NOT to test

- **Visual positioning** (e.g. tooltip placement coordinates). `happy-dom` returns zeroed `getBoundingClientRect`, so position assertions are meaningless. Use Storybook for visual checks.
- **Library internals** (e.g. `react-phone-number-input` formatting). Trust the upstream package's own tests.
- **Implementation details** like internal `useState` values. Test the rendered output and the public callbacks.

## See also

- [Storybook](Storybook) — visual + interactive component documentation
- [CI / CD](CI-CD) — when tests run
- [Pull Requests](Pull-Requests) — PR Testing section

# Toast

Auto-dismissing notification system. Wrap your app in `ToastProvider`, then trigger toasts from anywhere via the `useToast()` hook.

## Import

```tsx
import { ToastProvider, useToast } from "vega-react-components";
```

## `ToastProvider` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | App content. |
| `position` | `ToastPosition` | `'top-right'` | Where toasts appear on screen. |

`ToastPosition`: `'top-right' \| 'top-left' \| 'top-center' \| 'bottom-right' \| 'bottom-left' \| 'bottom-center'`.

## `useToast()`

Returns:

```ts
interface ToastContextValue {
  add: (toast: Omit<ToastData, 'id'>) => string;  // returns the toast id
  remove: (id: string) => void;
}
```

### `ToastData`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `id` | `string` | auto | Internal id (provided by `add`). |
| `message` | `ReactNode` | — | Toast body. |
| `title` | `string` | — | Optional title shown above message. |
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Visual style. |
| `duration` | `number` | `4000` | ms before auto-dismiss. `0` disables auto-dismiss. |

## Examples

### Setup

```tsx
// app/layout.tsx (Next.js) or root component
import { ToastProvider } from "vega-react-components";

export default function RootLayout({ children }) {
  return (
    <ToastProvider position="top-right">
      {children}
    </ToastProvider>
  );
}
```

### Triggering toasts

```tsx
"use client";
import { useToast } from "vega-react-components";

function SaveButton() {
  const { add } = useToast();

  const onSave = async () => {
    try {
      await save();
      add({ variant: "success", title: "Saved", message: "Your changes are live." });
    } catch (e) {
      add({ variant: "error", message: "Could not save. Please retry." });
    }
  };

  return <button onClick={onSave}>Save</button>;
}
```

### Persistent toast (no auto-dismiss)

```tsx
const id = add({
  variant: "warning",
  message: "Connection lost. Reconnecting…",
  duration: 0,
});

// Dismiss manually later
remove(id);
```

## See also

- [Loader](Loader) — for ongoing operations
- [Dialog](Dialog) — for blocking notifications

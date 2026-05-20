# Dialog

Modal window with focus trap, keyboard handling (ESC to close), and accessible markup. Composes with `Dialog.Header`, `Dialog.Body`, `Dialog.Footer`.

## Import

```tsx
import { Dialog } from "vega-react-components";
```

## `Dialog` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Required.** Whether the dialog is visible. |
| `onClose` | `() => void` | — | **Required.** Called when the dialog requests to close. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'fullscreen'` | `'md'` | Dialog size. |
| `closeOnBackdrop` | `boolean` | `true` | Close when clicking the backdrop. |
| `children` | `ReactNode` | — | Dialog content. |
| `className` | `string` | — | Extra class on the dialog box. |

## Sub-components

### `Dialog.Header`

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Header content (e.g. a title). |
| `onClose` | `() => void` | If provided, renders a close (×) button wired to this handler. |
| `className` | `string` | Extra class. |

### `Dialog.Body` / `Dialog.Footer`

Both accept `children` and `className`.

## Examples

### Basic

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>

<Dialog open={open} onClose={() => setOpen(false)}>
  <Dialog.Header onClose={() => setOpen(false)}>
    Confirm action
  </Dialog.Header>
  <Dialog.Body>
    Are you sure you want to delete this item? This cannot be undone.
  </Dialog.Body>
  <Dialog.Footer>
    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
    <Button variant="danger" onClick={handleDelete}>Delete</Button>
  </Dialog.Footer>
</Dialog>
```

### Sizes

```tsx
<Dialog open size="sm">…</Dialog>
<Dialog open size="md">…</Dialog>
<Dialog open size="lg">…</Dialog>
<Dialog open size="fullscreen">…</Dialog>
```

### Disable backdrop close

```tsx
<Dialog open={open} onClose={onClose} closeOnBackdrop={false}>
  {/* Force user to use the buttons in the footer */}
</Dialog>
```

## Accessibility

- Focus is trapped inside the dialog while open
- Pressing **Escape** triggers `onClose`
- The dialog has appropriate ARIA roles for screen readers

## See also

- [Toast](Toast) — non-blocking notifications
- [Tooltip](Tooltip) — lightweight contextual info

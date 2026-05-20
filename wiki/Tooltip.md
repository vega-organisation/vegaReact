# Tooltip

Contextual hint displayed on hover, click, or right-click. The tooltip auto-flips to stay inside the viewport.

## Import

```tsx
import { Tooltip } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement` | — | **Required.** A **single** React element that triggers the tooltip. |
| `content` | `ReactNode` | — | **Required.** Tooltip content (text or simple React content). |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Preferred placement (may flip if it doesn't fit). |
| `trigger` | `'hover' \| 'click' \| 'contextmenu' \| 'both'` | `'hover'` | How the tooltip is triggered. `'both'` means hover + click. |
| `openDelay` | `number` (ms) | `0` | Delay before showing on hover/focus. |
| `open` | `boolean` | — | Controlled open state (optional). |
| `onOpenChange` | `(open: boolean) => void` | — | Fires when open state changes. |
| `className` | `string` | — | Extra class on the tooltip box. |

## Examples

### Basic

```tsx
<Tooltip content="Save changes">
  <Button>Save</Button>
</Tooltip>
```

### Placement and delay

```tsx
<Tooltip content="Right side" placement="right" openDelay={200}>
  <Button>Hover me</Button>
</Tooltip>
```

### Click trigger

```tsx
<Tooltip content="Copied!" trigger="click">
  <Button onClick={copyToClipboard}>Copy</Button>
</Tooltip>
```

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Tooltip content="Heads up" open={open} onOpenChange={setOpen}>
  <Button>Trigger</Button>
</Tooltip>
```

## Notes

- `children` **must** be a single React element — the tooltip attaches handlers and ARIA attributes to it.
- For lightweight feedback, prefer `Tooltip`; for blocking choices, use [Dialog](Dialog).

## See also

- [ContextMenu](ContextMenu) — right-click menu
- [Dialog](Dialog) — blocking modal

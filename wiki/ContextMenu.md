# ContextMenu

Right-click menu with custom actions. Wraps any element and opens a contextual menu on right-click.

## Import

```tsx
import { ContextMenu } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** The element that triggers the menu on right-click. |
| `items` | `{ icon: string; label: string; onClick: (e) => void }[]` | — | Menu entries. |
| `disabled` | `boolean` | `false` | Disables the menu (right-click does nothing). |
| `onClick` | `(event: MouseEvent<HTMLDivElement>) => void` | — | Click handler on the wrapper element. |
| `className` | `string` | — | Extra class on the wrapper. |

### Item shape

| Field | Type | Description |
|-------|------|-------------|
| `icon` | `string` | Icon identifier (string — see component source for supported values). |
| `label` | `string` | Menu label. |
| `onClick` | `(e: MouseEvent<HTMLDivElement>) => void` | Fired when the entry is clicked. |

## Examples

### Basic

```tsx
<ContextMenu
  items={[
    { icon: "copy", label: "Copy", onClick: () => copy(value) },
    { icon: "trash", label: "Delete", onClick: () => remove(id) },
  ]}
>
  <div>Right-click me</div>
</ContextMenu>
```

### Disabled

```tsx
<ContextMenu items={items} disabled>
  <div>Right-click does nothing here</div>
</ContextMenu>
```

## See also

- [Tooltip](Tooltip) — supports a `'contextmenu'` trigger for simpler hint-on-right-click
- [Dialog](Dialog) — for blocking confirmations triggered from menu actions

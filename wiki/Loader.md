# Loader

Loading indicator with three variants: `spinner`, `skeleton`, `progress`. Supports indeterminate and determinate progress, and an optional full-screen overlay.

## Import

```tsx
import { Loader } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'spinner' \| 'skeleton' \| 'progress'` | `'spinner'` | Indicator style. |
| `value` | `number` (0–100) | — | Only for `progress`. Omit for indeterminate. |
| `overlay` | `boolean` | `false` | Render a full-screen backdrop that blocks interaction. |
| `label` | `string` | — | Visually hidden accessibility label. |
| `width` | `string` | — | CSS width, **skeleton only** (e.g. `"200px"`, `"100%"`). |
| `height` | `string` | — | CSS height, **skeleton only** (e.g. `"1rem"`, `"80px"`). |
| `className` | `string` | — | Extra class on the root element. |

## Examples

### Spinner

```tsx
<Loader />
<Loader variant="spinner" label="Loading users" />
```

### Spinner with overlay

```tsx
{isLoading && <Loader overlay label="Saving…" />}
```

### Skeleton

```tsx
<Loader variant="skeleton" width="100%" height="1rem" />
<Loader variant="skeleton" width="240px" height="120px" />
```

### Progress (determinate)

```tsx
<Loader variant="progress" value={uploadedPercent} />
```

### Progress (indeterminate)

```tsx
<Loader variant="progress" />
```

## See also

- [Toast](Toast) — auto-dismissing notifications
- [ModelViewer](ModelViewer) — uses `Loader` as the default loading fallback

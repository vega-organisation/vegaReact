# Button

Clickable action element with multiple variants and sizes.

## Import

```tsx
import { Button } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Button content (required). |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success'` | `'primary'` | Visual style. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size. |
| `fullWidth` | `boolean` | `false` | Stretch to fill parent width. |
| ...rest | `ButtonHTMLAttributes<HTMLButtonElement>` | — | Standard HTML button attributes (`onClick`, `disabled`, `type`, etc.). |

## Examples

### Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
```

### Sizes

```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Full width

```tsx
<Button fullWidth>Submit</Button>
```

### Disabled

```tsx
<Button disabled>Unavailable</Button>
```

## See also

- [Components](Components) — full component list
- Storybook: `Components/Button` (run `npm run storybook`)

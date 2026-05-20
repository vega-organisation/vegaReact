# Checkbox

Selectable input for boolean values, supporting `indeterminate` state and an optional description.

## Import

```tsx
import { Checkbox } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Label rendered next to the checkbox. |
| `description` | `ReactNode` | — | Secondary text under the label. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Checkbox size. |
| `indeterminate` | `boolean` | `false` | Renders the indeterminate (`–`) state. |
| `error` | `string` | — | Error message; renders below in the error color. |
| `fullWidth` | `boolean` | `false` | Stretch to fill parent width. |
| ...rest | `InputHTMLAttributes<HTMLInputElement>` (without `size`, `type`) | — | Standard HTML input attributes (`checked`, `onChange`, `disabled`, etc.). |

## Examples

### Basic

```tsx
<Checkbox label="Accept terms" />
```

### Controlled

```tsx
const [checked, setChecked] = useState(false);

<Checkbox
  label="Subscribe to newsletter"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### With description

```tsx
<Checkbox
  label="Marketing emails"
  description="Get occasional product updates and tips."
/>
```

### Indeterminate

```tsx
<Checkbox label="Select all" indeterminate />
```

### With error

```tsx
<Checkbox label="I agree" error="You must accept the terms to continue" />
```

## See also

- [Components](Components) — full component list

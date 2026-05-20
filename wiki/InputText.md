# InputText

Basic text input with label, helper text, validation status, and size variants.

## Import

```tsx
import { InputText } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Label rendered above the input. |
| `helperText` | `ReactNode` | — | Helper/error text rendered below. |
| `status` | `'normal' \| 'error' \| 'success'` | `'normal'` | Visual status (border + helper text color). |
| `variant` | `'outlined' \| 'filled'` | `'outlined'` | Visual style. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| `fullWidth` | `boolean` | `false` | Stretch to fill parent width. |
| ...rest | `InputHTMLAttributes<HTMLInputElement>` (without `size`) | — | Standard HTML input attributes. |

## Examples

### Basic

```tsx
<InputText label="First name" placeholder="John" />
```

### With validation

```tsx
<InputText
  label="Email"
  status="error"
  helperText="Please enter a valid email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Variants and sizes

```tsx
<InputText variant="filled" size="large" label="Search" />
<InputText variant="outlined" size="small" label="Code" />
```

### Full width

```tsx
<InputText fullWidth label="Address" />
```

## See also

- [InputEmail](InputEmail) — same API with built-in email validation
- [FormWrapper](FormWrapper) — wrap inputs to share submission state

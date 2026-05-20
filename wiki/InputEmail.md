# InputEmail

Text input with built-in email format validation. Renders an HTML `input[type="email"]`.

## Import

```tsx
import { InputEmail } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `ReactNode` | — | Label rendered above the input. |
| `helperText` | `ReactNode` | — | Helper/error text rendered below. |
| `status` | `'default' \| 'error' \| 'success'` | `'default'` | Visual status. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| `fullWidth` | `boolean` | `false` | Stretch to fill parent width. |
| ...rest | `InputHTMLAttributes<HTMLInputElement>` (without `type` and `size`) | — | Standard HTML input attributes. |

## Examples

### Basic

```tsx
<InputEmail label="Email" placeholder="you@example.com" />
```

### With error

```tsx
<InputEmail
  label="Email"
  status="error"
  helperText="Invalid email address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Full width

```tsx
<InputEmail fullWidth label="Work email" />
```

## See also

- [InputText](InputText) — generic text input
- [PhoneNumberInput](PhoneNumberInput) — phone-specific input

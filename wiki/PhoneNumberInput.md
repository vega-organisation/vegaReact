# PhoneNumberInput

International phone input with country selector and E.164 formatting. Built on [`react-phone-number-input`](https://www.npmjs.com/package/react-phone-number-input) (optional peer dep).

## Import

```tsx
import { PhoneNumberInput } from "vega-react-components";
```

> Make sure to install the optional peer dependency:
> ```bash
> npm install react-phone-number-input
> ```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Phone number in E.164 format (e.g. `"+33612345678"`). |
| `onChange` | `(value?: string) => void` | — | **Required.** Fired on value change. |
| `defaultCountry` | `Country` (ISO 3166-1 alpha-2) | — | **Required.** Default country code (e.g. `"FR"`, `"US"`). |
| `label` | `ReactNode` | — | Label rendered above the input. |
| `helperText` | `ReactNode` | — | Helper/error text rendered below. |
| `status` | `'default' \| 'error' \| 'success'` | `'default'` | Visual status. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Input size. |
| `fullWidth` | `boolean` | `false` | Stretch to fill parent width. |
| `id` | `string` | auto-generated | Optional id for the input element. |
| ...rest | `InputHTMLAttributes<HTMLInputElement>` (without `onChange`, `value`, `size`) | — | Standard HTML input attributes. |

## Examples

### Basic

```tsx
const [phone, setPhone] = useState<string>();

<PhoneNumberInput
  label="Phone"
  defaultCountry="FR"
  value={phone}
  onChange={setPhone}
/>
```

### With validation

```tsx
<PhoneNumberInput
  label="Phone"
  defaultCountry="US"
  status="error"
  helperText="Invalid phone number"
  value={phone}
  onChange={setPhone}
/>
```

## See also

- [InputText](InputText) for generic text inputs
- Library reference: [react-phone-number-input](https://gitlab.com/catamphetamine/react-phone-number-input)

# FormWrapper

Form container that provides shared submission state (loading, disabled, error) to its children via React context.

## Import

```tsx
import { FormWrapper, useFormContext } from "vega-react-components";
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `(e: FormEvent<HTMLFormElement>) => void` | — | **Required.** Submit handler. |
| `isSubmitting` | `boolean` | `false` | Marks the form as submitting (exposed via context). |
| `disabled` | `boolean` | `false` | Disables the form globally. |
| `error` | `string` | — | Top-level error message displayed inside the form. |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spacing between children. |
| `children` | `ReactNode` | — | Form fields, buttons, etc. |
| ...rest | `FormHTMLAttributes<HTMLFormElement>` (without `onSubmit`) | — | Standard HTML form attributes. |

## `useFormContext()`

Returns `FormContextValue`:

```ts
interface FormContextValue {
  isSubmitting: boolean;
  isDisabled: boolean;
  error: string | null;
}
```

Use it inside any descendant of `FormWrapper` to react to form state.

## Examples

### Basic

```tsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email);
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      error={error}
      gap="md"
    >
      <InputEmail
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Log in</Button>
    </FormWrapper>
  );
}
```

### Reading context in a child

```tsx
function SubmitButton() {
  const { isSubmitting, isDisabled } = useFormContext();

  return (
    <Button type="submit" disabled={isDisabled || isSubmitting}>
      {isSubmitting ? "Sending…" : "Submit"}
    </Button>
  );
}
```

## See also

- [InputText](InputText), [InputEmail](InputEmail), [PhoneNumberInput](PhoneNumberInput), [Checkbox](Checkbox) — form inputs
- [Button](Button) — submit buttons

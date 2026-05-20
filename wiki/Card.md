# Card

Container component for grouping content. Composes with `Card.Media`, `Card.Header`, `Card.Body`, `Card.Footer`.

## Import

```tsx
import { Card } from "vega-react-components";
```

## `Card` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'interactive'` | `'default'` | Visual style. |
| `onClick` | `() => void` | — | Makes the card clickable (adds `role="button"` and keyboard support). |
| `children` | `ReactNode` | — | Card content. |
| `className` | `string` | — | Extra class on the root. |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | Standard div attributes. |

## Sub-components

### `Card.Media`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | **Required.** Image URL. |
| `alt` | `string` | `""` | Alt text. |
| `ratio` | `'16/9' \| '4/3' \| '1/1' \| '3/4'` | `'16/9'` | Aspect ratio of the media area. |
| `className` | `string` | — | Extra class. |

### `Card.Header` / `Card.Body` / `Card.Footer`

All accept `children`, `className`, and any `HTMLAttributes<HTMLDivElement>`.

## Examples

### Basic

```tsx
<Card>
  <Card.Body>Simple card with body only.</Card.Body>
</Card>
```

### Full composition

```tsx
<Card variant="elevated">
  <Card.Media src="/hero.jpg" alt="Mountain view" ratio="16/9" />
  <Card.Header>
    <h3>Trip to the Alps</h3>
  </Card.Header>
  <Card.Body>
    Three days of hiking through alpine meadows.
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Book now</Button>
  </Card.Footer>
</Card>
```

### Interactive (clickable) card

```tsx
<Card variant="interactive" onClick={() => navigate("/post/42")}>
  <Card.Body>Click anywhere to open the post.</Card.Body>
</Card>
```

### Outlined

```tsx
<Card variant="outlined">
  <Card.Body>Minimal style with a border.</Card.Body>
</Card>
```

## See also

- [Components](Components) — full component list

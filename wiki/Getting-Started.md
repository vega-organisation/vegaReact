# Getting Started

## Installation

```bash
npm install vega-react-components lucide-react
```

`react-phone-number-input` is only required if you use the `PhoneNumberInput` component:

```bash
npm install react-phone-number-input
```

### Peer dependencies

| Package | Version |
|---------|---------|
| `react` | `>=18.0.0` |
| `react-dom` | `>=18.0.0` |
| `lucide-react` | `>=0.400.0` |
| `react-phone-number-input` *(optional)* | `>=3.4.0` |

## Import styles

Import the global stylesheet **once** at your app entry point (e.g. Next.js `app/layout.tsx`):

```tsx
import "vega-react-components/style.css";
```

## Use a component

In the Next.js App Router, components must be used in a client boundary:

```tsx
"use client";

import { Button } from "vega-react-components";

export function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

## Next steps

- Explore the [Components](Components) list
- Open Storybook for live examples: `npm run storybook`
- Read the [Architecture](Architecture) page to understand the design tokens

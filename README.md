# Vega components

A React component library. Public and open to use, fork, or contribute.

## Installation

```bash
npm install vega-react-components lucide-react
```

`react-phone-number-input` is only required if you use `PhoneNumberInput`:

```bash
npm install react-phone-number-input
```

Peer dependencies: `react` and `react-dom` (18+).

## Usage

Import styles once in your app entry (e.g. Next.js `layout.tsx`):

```tsx
import "vega-react-components/style.css";
```

Use components in a client boundary (Next.js App Router):

```tsx
"use client";

import { Button } from "vega-react-components";

export function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

## Documentation

```bash
npm run storybook
```

## Development

```bash
npm install
npm run build
npm test
```

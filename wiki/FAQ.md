# FAQ

## Does the library work with Next.js App Router?

Yes. `src/index.ts` starts with `"use client"`, so importing any component automatically marks the consumer file as a client component. You can also explicitly wrap usage in a `"use client"` boundary.

## Do I need to import CSS manually?

Yes — once, in your app entry:

```tsx
import "vega-react-components/style.css";
```

This file is generated at build time and contains all component styles plus the design tokens.

## Is `lucide-react` required?

Yes — it's a peer dependency used by several components for icons. Install it alongside the library:

```bash
npm install vega-react-components lucide-react
```

## Is `react-phone-number-input` required?

Only if you use the `PhoneNumberInput` component. It's an **optional** peer dependency.

## Which React versions are supported?

React **18+** and React **19**. `react` and `react-dom` are peer dependencies.

## Why are there both ESM and CJS bundles?

To support both modern bundlers (ESM via `import`) and Node.js / legacy tooling (CJS via `require`). The right one is selected automatically through the `"exports"` field in `package.json`.

## How can I see all components live?

Run Storybook:

```bash
npm run storybook
```

Then open <http://localhost:6006>.

## How do I report a bug or request a feature?

Open an issue on [GitHub](https://github.com/vega-organisation/vegaReact/issues). For contributions, see the [Contributing](Contributing) page.

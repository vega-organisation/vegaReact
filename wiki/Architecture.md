# Architecture

## Folder structure

```
src/
├── assets/styles/         # Global CSS — tokens, typography
│   ├── tokens.css         # Colors, borders, backgrounds
│   └── typography.css     # Font sizes, weights
├── components/            # One folder per component (5-file convention)
│   ├── Button/
│   ├── Card/
│   └── ...
└── index.ts               # Public API — exports all components and types
```

## Build & distribution

- **Bundler**: Vite 7 (library mode) + `vite-plugin-dts` for type declarations
- **Output**: dual format — `dist/vegareact.es.js` (ESM) + `dist/vegareact.cjs.js` (CJS)
- **Types**: `dist/index.d.ts`
- **CSS**: bundled to `dist/style.css`, exported as `vega-react-components/style.css`
- **`"use client"`** directive at the top of `src/index.ts` for Next.js / RSC compatibility

## Design tokens

All visual values come from CSS custom properties in `src/assets/styles/tokens.css`. Components must reference these tokens — no hardcoded colors, spacing, or fonts.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#6d28d9` | Primary actions |
| `--color-secondary` | `#e5e7eb` | Secondary actions |
| `--color-error` | `#ef4444` | Error states |
| `--color-success` | `#22c55e` | Success states |
| `--bg-surface` | `#ffffff` | Component backgrounds |
| `--bg-disabled` | `#f3f4f6` | Disabled backgrounds |
| `--text-main` | `#111827` | Primary text |
| `--text-secondary` | `#9ca3af` | Secondary text / placeholders |
| `--text-inverse` | `#ffffff` | Text on dark backgrounds |
| `--border-default` | `#d1d5db` | Default borders |
| `--border-focus` | `#111827` | Focus borders |
| `--border-error` | `#ef4444` | Error borders |
| `--border-success` | `#22c55e` | Success borders |

### Typography

- **Sizes**: `--text-xs` (12px), `--text-sm` (14px), `--text-base` (16px), `--text-md` (18px), `--text-lg` (20px), `--text-xl` (24px)
- **Weights**: `--font-light` (300), `--font-normal` (400), `--font-medium` (500), `--font-semibold` (600), `--font-bold` (700)

## CSS conventions

- **BEM-style** naming: `.mycomponent`, `.mycomponent--variant`, `.mycomponent__element`
- **Size variants**: `--small`, `--medium`, `--large`
- **Status variants**: `--default`, `--error`, `--success`
- **State variants**: `--disabled`, `--full-width`
- Use `:focus-visible` for keyboard focus styles
- Animations: `transition: ... 0.2s ease`

## TypeScript

- **Strict mode** enabled
- `noUnusedLocals` and `noUnusedParameters` enforced
- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `erasableSyntaxOnly: true` — no `const enum`, no legacy decorators

## Scripts

```bash
npm run storybook        # Storybook dev server (port 6006)
npm run build            # tsc + Vite build
npm run lint             # ESLint
npm run test             # Vitest (run once)
npm run test:watch       # Vitest watch mode
npm run knip             # Detect unused exports/files
npm run build-storybook  # Static Storybook build
```

## CI pipeline

PRs to `main` run:
1. **Knip** — unused-code detection
2. **ESLint** — TS + React rules
3. **Build Storybook** — verifies compilation

Workflows use `npm install --legacy-peer-deps`.

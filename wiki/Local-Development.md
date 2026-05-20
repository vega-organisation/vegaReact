# Local Development

Setup for **contributors** who clone the repo. (For **consumers** who just want to install the package, see [Getting Started](Getting-Started).)

## Prerequisites

- **Node.js 24** (matches CI — `nvm install 24 && nvm use 24` if you use nvm)
- **npm** (comes with Node)
- Git
- A code editor with TypeScript support (VS Code recommended)

## Clone and install

```bash
git clone https://github.com/vega-organisation/vegaReact.git
cd vegaReact
npm install
```

> If you hit peer-dep errors, use `npm install --legacy-peer-deps` (this is what CI uses for some workflows).

## Daily commands

| Command | What it does |
|---------|--------------|
| `npm run storybook` | Storybook dev server on http://localhost:6006 — your main workbench |
| `npm run test:watch` | Vitest in watch mode |
| `npm test` | Vitest, run once (what CI runs) |
| `npm run lint` | ESLint |
| `npm run knip` | Detect unused files / exports / types |
| `npm run build` | TypeScript check + Vite library build into `dist/` |
| `npm run build-storybook` | Static Storybook build |

## Editor setup (VS Code)

Recommended extensions:

- **ESLint** (`dbaeumer.vscode-eslint`) — inline lint feedback
- **Prettier** (optional — the repo doesn't enforce Prettier, but it doesn't hurt)
- **vscode-styled-components** or similar if you want CSS-in-JS highlights (we use plain CSS files though)
- **Vitest** (`vitest.explorer`) — run tests from the editor

## Project layout (the parts you'll touch)

```
src/
├── assets/styles/         # Global CSS (tokens, typography)
├── components/            # One folder per component (5-file convention)
│   └── MyComponent/
│       ├── MyComponent.tsx
│       ├── MyComponent.types.ts
│       ├── MyComponent.css
│       ├── MyComponent.stories.tsx
│       ├── MyComponent.test.tsx
│       └── index.ts
└── index.ts               # Public exports — add your new component here

.storybook/                # Storybook config
.github/workflows/         # CI pipelines
wiki/                      # Wiki source (this folder)
```

See [Architecture](Architecture) for the full breakdown.

## Adding a component end-to-end

```bash
git checkout main && git pull
git checkout -b 42-add-radio-component

# 1. Create the 5-file structure
mkdir src/components/Radio
# Create Radio.tsx, Radio.types.ts, Radio.css, Radio.stories.tsx, Radio.test.tsx, index.ts

# 2. Register in src/index.ts:
# export { Radio } from "./components/Radio";
# export type { RadioProps } from "./components/Radio/Radio.types";

# 3. Verify locally
npm run test:watch        # Build it test-first or test-after, your call
npm run storybook         # Visually verify all variants/sizes/states
```

See [Contributing](Contributing) for the full workflow and the 5-file convention.

## Pre-PR checklist

Run the same chain CI runs **before pushing** so you don't burn a CI cycle on a typo:

```bash
npm run knip
npm run lint
npx tsc --noEmit
npm test
npm run build-storybook
```

One-liner:

```bash
npm run knip && npm run lint && npx tsc --noEmit && npm test && npm run build-storybook
```

If anything fails, fix it locally — don't push a known-broken PR.

## Common gotchas

- **`"use client"` directive at the top of `src/index.ts`** — required for Next.js / RSC. Don't remove it.
- **`verbatimModuleSyntax: true`** — use `import type { Foo }` for types-only imports, otherwise build fails.
- **`noUnusedLocals` / `noUnusedParameters`** — even an unused import will fail the build. Clean as you go.
- **CSS tokens only** — don't hardcode colors / spacing / font sizes. Reference variables from `src/assets/styles/tokens.css` (see [Architecture](Architecture)).
- **`lucide-react` for icons** — no custom SVGs.

## Troubleshooting

| Symptom | Likely cause / fix |
|---------|--------------------|
| `npm install` fails on peer deps | Use `npm install --legacy-peer-deps` |
| Storybook white-screens after dep update | Delete `node_modules/.cache` and restart |
| TS error on `import type` rule | You used `import { Foo }` for a type — switch to `import type { Foo }` |
| Knip complains about unused export | Either use it in `src/index.ts` or remove it |
| Tests pass locally but fail in CI | Check Node version (CI is Node 24) and that `package-lock.json` is committed |

## See also

- [Contributing](Contributing) — branching, commits, workflow
- [Testing](Testing) — how to write tests
- [Storybook](Storybook) — how to write stories
- [Pull Requests](Pull-Requests) — opening a PR after you're done

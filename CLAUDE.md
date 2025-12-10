# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

VegaReact is a modern React component library built with TypeScript and Vite. It's designed as a publishable npm package that provides reusable UI components with full TypeScript support.

## Build System & Architecture

- **Build Tool**: Vite with library mode configuration
- **Library Output**: Dual format (ESM and CJS) at `dist/vegareact.es.js` and `dist/vegareact.cjs`
- **Type Definitions**: Generated via `vite-plugin-dts` into `dist/index.d.ts`
- **External Dependencies**: React and ReactDOM are peer dependencies (not bundled)
- **Entry Point**: [src/index.ts](src/index.ts) - all components must be exported here

## Common Commands

```bash
# Development server (runs demo app)
npm run dev

# Build the library (TypeScript compilation + Vite build)
npm run build

# Build library only (without TypeScript check)
npm run build:lib

# Run linter
npm run lint

# Preview built library
npm run preview

# Run Storybook documentation on port 6006
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Component Structure

Each component follows a strict folder-based pattern:

```
src/components/ComponentName/
├── ComponentName.tsx          # Component implementation
├── ComponentName.types.ts     # TypeScript interfaces/types
├── ComponentName.css          # Component styles (scoped with vega- prefix)
├── ComponentName.stories.tsx  # Storybook documentation
└── index.ts                   # Re-exports component
```

**Important conventions**:
- Component class names use `vega-` prefix (e.g., `vega-button`, `vega-button--primary`)
- Components extend native HTML element props when applicable
- Use BEM-like naming for CSS classes: `vega-component--variant--modifier`
- All components must set `displayName` for better debugging

## Adding New Components

1. Create component directory under `src/components/`
2. Follow the structure pattern shown above
3. Export component and types from `src/index.ts`:
   ```typescript
   export { ComponentName } from './components/ComponentName';
   export type { ComponentNameProps } from './components/ComponentName/ComponentName.types';
   export './components/ComponentName/ComponentName.css';
   ```
4. Create Storybook stories for documentation

## TypeScript Configuration

- **Strict mode enabled** with additional linting rules
- **Module**: ESNext with bundler resolution
- **JSX**: react-jsx (automatic runtime)
- **Target**: ES2022
- Project uses project references (tsconfig.app.json, tsconfig.node.json)

## Storybook

- Stories are auto-discovered from `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Uses Vite framework integration
- Includes addon-docs and addon-onboarding
- Documentation accessible via `npm run storybook`

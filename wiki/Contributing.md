# Contributing

Thanks for contributing to **vega-react-components**. This page covers the day-to-day workflow. For details, see:

- [Pull Requests](Pull-Requests) — PR template, video requirement, reviews, merge strategy
- [CI / CD](CI-CD) — the workflows that run on every PR
- [Release Process](Release-Process) — how versions are published to npm
- [Architecture](Architecture) — design tokens, conventions, folder structure

## Workflow at a glance

```
1. Pick or open an issue
2. Create a branch:  <issue-number>-kebab-case-summary
3. Code + commit (conventional commits)
4. Open a PR (template, screenshots/video for UI)
5. CI must pass (knip → lint → tsc → test → build-storybook)
6. Get 2 approvals
7. Squash + merge into main
8. Thomas publishes to npm manually when appropriate
```

## 1. Issues

Every change starts with a GitHub [issue](https://github.com/vega-organisation/vegaReact/issues). If one doesn't exist for the work you want to do, **open it first** — the PR validation workflow requires every PR to link an issue.

## 2. Branches

Naming convention: `<issue-number>-kebab-case-summary`

Examples:
- `34-checkbox-component`
- `72-readme-update`
- `88-create-github-wiki`

Branch from up-to-date `main`:

```bash
git checkout main
git pull
git checkout -b 42-add-radio-component
```

## 3. Commits

We follow **conventional commits** with these prefixes:

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature / component |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no code change |
| `refactor:` | Code change that doesn't add a feature or fix a bug |
| `perf:` | Performance improvement |
| `test:` | Adding or fixing tests |
| `chore:` | Build/tooling/deps |
| `ci:` | CI configuration |

Optional scope: `feat(ui): add Radio component`. Append the issue number when relevant: `feat(ui): add Radio component #42`.

Examples from the repo log:
- `feat(ui): add ModelViewer component for GLTF/GLB rendering`
- `fix(ci): publish workflow auth + clean build type errors`
- `docs: add components list in COMPONENTS.md #72`
- `chore: ignore coverage directory`

## 4. Open a Pull Request

See [Pull Requests](Pull-Requests) for the full template and rules. The short version:

- **Title** must start with a conventional-commit prefix (`feat:`, `fix:`, etc.) — enforced by CI
- **Body** must include `## Description`, `## Testing`, and link the issue with `closes #<n>` / `fixes #<n>` / `resolves #<n>` — enforced by CI
- **UI changes require a video/GIF** of the result in the PR description
- Target branch: `main`

## 5. Code review

- **Two approvals are required** before a PR can be merged
- Address review comments by pushing new commits (don't force-push during review)
- The reviewers are typically other collaborators on the project

## 6. Merge

We use **Squash and merge** — one clean commit per PR lands on `main`. Edit the squash commit message so it still follows the conventional-commit format.

## 7. Release

The npm package is **not** published automatically. Thomas runs the `Publish to npm` workflow manually when a release is ready. See [Release Process](Release-Process).

## Coding conventions

- **TypeScript strict** — no `any` without justification, no unused locals/params, use `import type` for type-only imports
- **CSS** — BEM (`.mycomponent`, `.mycomponent--variant`, `.mycomponent__element`), one file per component, design tokens only (no hardcoded colors/spacing) — see [Architecture](Architecture)
- **Icons** — `lucide-react` only, no custom SVGs
- **Accessibility** — `useId()` for label/input association, `:focus-visible` for keyboard focus
- **Stories** — cover all variants, sizes, disabled, full-width

## Adding a new component

Every component lives in `src/components/<ComponentName>/` and must include the **5-file structure**:

```
src/components/MyComponent/
├── MyComponent.tsx         # Implementation
├── MyComponent.types.ts    # Props interface
├── MyComponent.css         # Scoped styles (BEM)
├── MyComponent.stories.tsx # Storybook stories
└── index.ts                # Barrel export
```

Then register it in `src/index.ts`:

```ts
export { MyComponent } from "./components/MyComponent";
export type { MyComponentProps } from "./components/MyComponent/MyComponent.types";
```

Add a `MyComponent.test.tsx` covering the main behaviors.

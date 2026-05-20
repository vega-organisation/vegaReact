# CI / CD

Three GitHub Actions workflows live under `.github/workflows/`:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `pr-validation.yml` | Pull request opened / edited / sync'd | Enforces PR title + body conventions |
| `build.yml` | Pull request to `main` | Runs the full build chain (knip → lint → tsc → test → storybook) |
| `publish.yml` | Manual (`workflow_dispatch`) | Publishes the package to npm |

## PR Validation

**File**: `.github/workflows/pr-validation.yml`

Fails the PR if any of the following is missing:

1. **Title prefix** — one of `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:`, `ci:`
2. **Linked issue** in the body — `fixes #`, `closes #`, or `resolves #`
3. **`## Description`** section in the body
4. **`## Testing`** section in the body

See [Pull Requests](Pull-Requests) for the recommended template.

## Build

**File**: `.github/workflows/build.yml`
**Triggered**: every PR to `main`
**Runtime**: `ubuntu-latest`, **Node 24**

Steps (in order — fails fast on first error):

| # | Step | Command | Purpose |
|---|------|---------|---------|
| 1 | Install | `npm ci` | Clean install from `package-lock.json` |
| 2 | Declutter | `npm run knip` | Detects unused files / exports / types |
| 3 | Lint | `npm run lint` | ESLint with TypeScript + React rules |
| 4 | Type-check | `npx tsc --noEmit` | Type validation without emitting |
| 5 | Test | `npm run test` | Vitest (run once, not watch) |
| 6 | Build Storybook | `npm run build-storybook` | Verifies the library + stories compile |

All six steps must pass for a PR to be mergeable.

### Running the same chain locally

```bash
npm ci
npm run knip
npm run lint
npx tsc --noEmit
npm run test
npm run build-storybook
```

Run this before pushing to avoid red CI builds.

## Publish to npm

**File**: `.github/workflows/publish.yml`
**Triggered**: **manually** via `workflow_dispatch` from the Actions tab

Steps:

1. Checkout
2. Setup Node 24 with the npm registry
3. `npm ci`
4. `npm run build` (TypeScript + Vite library build)
5. `npm publish --provenance --access public`
   - Uses `NPM_TOKEN` secret as `NODE_AUTH_TOKEN`
   - `--provenance` produces an [npm provenance attestation](https://docs.npmjs.com/generating-provenance-statements) tied to the GitHub Actions run

The job has `permissions: id-token: write` so npm provenance can use OIDC.

See [Release Process](Release-Process) for who triggers this and when.

## Adding a new workflow

If you need a new check, add a file under `.github/workflows/`. Keep these conventions:

- Use `actions/checkout@v4`, `actions/setup-node@v4` (current versions in the repo)
- Pin `node-version` to `24` unless there's a reason to differ
- Prefer `npm ci` over `npm install` for reproducibility
- If the workflow blocks merges, add it to the branch protection rules on `main`

# Release Process

The npm package is **not** released automatically when a PR merges to `main`. **Thomas** triggers a release manually when a set of changes is ready to ship.

## Who and when

- **Who**: Thomas (maintainer)
- **When**: at his discretion, typically after a meaningful batch of changes has accumulated on `main` (one or more new components, a bug-fix wave, etc.)
- **Frequency**: irregular — not a fixed cadence

If you've merged a change you'd like released, ping Thomas in the team channel rather than waiting silently.

## Steps (for the releaser)

### 1. Bump the version

From `main`, on a fresh branch:

```bash
git checkout main
git pull
git checkout -b chore/release-1.x.y
```

Update `package.json` (`"version": "1.x.y"`). The matching update in `package-lock.json` happens automatically the next time you run `npm install`. Follow [semver](https://semver.org/):

- **Patch** (`1.0.2` → `1.0.3`): bug fixes, no API change
- **Minor** (`1.0.x` → `1.1.0`): new feature/component, backwards-compatible
- **Major** (`1.x.y` → `2.0.0`): breaking change

Open a PR with title `chore: release 1.x.y`, get the two approvals, squash-merge.

### 2. Trigger the publish workflow

Once the version bump is on `main`:

1. Go to the [Actions tab](https://github.com/vega-organisation/vegaReact/actions)
2. Select **Publish to npm**
3. Click **Run workflow** → choose `main` → **Run workflow**

The workflow builds and runs `npm publish --provenance --access public`. Provenance ties the published artifact to the exact GitHub Actions run, so consumers can verify origin.

### 3. Verify

- The new version appears on [npm](https://www.npmjs.com/package/vega-react-components)
- `npm install vega-react-components@latest` in a consumer project resolves to the new version

### 4. Announce

Drop a note in the team channel: version, headline changes, link to the [GitHub release](https://github.com/vega-organisation/vegaReact/releases) (optional — we don't always cut a GitHub release).

## Troubleshooting

- **`404 Not Found` during publish** — the `NODE_AUTH_TOKEN` secret is missing or the workflow has a step that runs `npm publish` without the env variable. See PR #83 for the historical fix.
- **`403 Forbidden`** — the npm account doesn't own `vega-react-components`, or the version was already published. Check `npm view vega-react-components versions`.
- **Provenance error** — make sure the workflow has `permissions: id-token: write` (it does, but check if you've copied the workflow elsewhere).

## See also

- [CI / CD](CI-CD#publish-to-npm) — workflow file details
- [Contributing](Contributing) — day-to-day workflow

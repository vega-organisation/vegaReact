# Pull Requests

Every change to `main` goes through a Pull Request. This page documents the exact conventions our [PR validation workflow](CI-CD#pr-validation) enforces, plus the team-level rules (video, reviews, merge strategy) that aren't in CI but are required.

## Title

The PR title **must start with a conventional-commit prefix** (enforced by CI):

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

Optional scope: `feat(ui): add Radio component`. Keep titles under ~70 chars; put detail in the description.

## Body — required sections

The PR body **must include** (enforced by CI):

1. A linked issue: `closes #<n>`, `fixes #<n>`, or `resolves #<n>`
2. A `## Description` section
3. A `## Testing` section

## Recommended template

```markdown
closes #<issue-number>

## Description

<What this PR changes and why. 1–3 paragraphs or bullets.>

<For UI changes: drag-and-drop a video/GIF here showing the result.>

## Testing

- [ ] `npm run build`
- [ ] `npm test`
- [ ] `npm run lint`
- [ ] Manual check in Storybook

## Notes (optional)

<Anything reviewers should know: trade-offs, follow-ups, out-of-scope items.>
```

## Video / screenshots (team rule)

**Any PR that changes the UI must include a video or GIF of the result.** Drag-and-drop it directly into the PR description on GitHub — the platform hosts it for you.

What counts as a UI change:
- New component, new variant, new size
- Visual change to an existing component (colors, spacing, layout, animation)
- Storybook story changes that affect the rendered output

A static screenshot is acceptable for trivial visual changes (e.g. a copy update), but a short screen recording is strongly preferred for interactive behavior (hover, focus, animations, modals, etc.).

## Reviews

- **Two approvals are required** before merging
- Address review comments with **additional commits** (don't force-push during review — it makes the review history unreadable)
- If a reviewer is unavailable, ping another collaborator rather than waiting indefinitely

## Merge strategy

We use **Squash and merge**. A single commit lands on `main` for each PR.

When you squash, **edit the squash commit message** so it still follows conventional commits:

```
feat(ui): add Radio component #42

- Adds Radio + RadioGroup components
- Includes Storybook stories and unit tests
```

The default GitHub-generated squash message (concatenating all commit titles) is usually noisy — clean it up before clicking "Confirm squash and merge."

## After merge

- Delete the branch (GitHub offers a button after merge)
- The PR doesn't trigger an npm release — see [Release Process](Release-Process)

## CI checks summary

A PR cannot be merged until all of the following pass:

| Check | What it verifies |
|-------|------------------|
| PR Validation | Title prefix, linked issue, Description and Testing sections |
| Build → Knip | No unused exports/files |
| Build → Lint | ESLint clean |
| Build → Type-check | `tsc --noEmit` clean |
| Build → Test | All Vitest tests pass |
| Build → Storybook | Storybook compiles |

See [CI / CD](CI-CD) for workflow details.

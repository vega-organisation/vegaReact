# Wiki source

This folder contains the markdown source for the project's [GitHub Wiki](https://github.com/vega-organisation/vegaReact/wiki).

## Pages

### General
| File | Wiki page |
|------|-----------|
| `Home.md` | Home (landing page) |
| `Getting-Started.md` | Getting Started |
| `Components.md` | Components index |
| `Contributing.md` | Contributing guide |
| `Local-Development.md` | Contributor setup, daily commands, pre-PR checklist |
| `Pull-Requests.md` | PR conventions (template, video, reviews) |
| `Testing.md` | Vitest + testing-library conventions |
| `Storybook.md` | Story file structure, patterns |
| `CI-CD.md` | GitHub Actions workflows |
| `Release-Process.md` | npm publish process |
| `Architecture.md` | Architecture / design tokens |
| `FAQ.md` | FAQ |
| `_Sidebar.md` | Navigation sidebar (rendered on every wiki page) |

### Components
| File | Wiki page |
|------|-----------|
| `Button.md` | Button |
| `Checkbox.md` | Checkbox |
| `InputText.md` | InputText |
| `InputEmail.md` | InputEmail |
| `PhoneNumberInput.md` | PhoneNumberInput |
| `FormWrapper.md` | FormWrapper |
| `Loader.md` | Loader |
| `Toast.md` | Toast |
| `Card.md` | Card |
| `Sidebar.md` | Sidebar |
| `Navbar.md` | Navbar |
| `Dialog.md` | Dialog |
| `Tooltip.md` | Tooltip |
| `ContextMenu.md` | ContextMenu |
| `ModelViewer.md` | ModelViewer |

## How to publish

The GitHub wiki lives in a **separate repo**: `vegaReact.wiki.git`.

```bash
# Clone the wiki repo (sibling folder)
git clone https://github.com/vega-organisation/vegaReact.wiki.git

# Copy the pages from this folder
cp wiki/*.md ../vegaReact.wiki/

# Publish
cd ../vegaReact.wiki
git add .
git commit -m "Update wiki pages"
git push
```

> The wiki must be enabled in the repo settings (Settings → Features → Wikis) and at least one page must be created via the web UI before the wiki repo exists and can be cloned.

## Testing locally

GitHub renders wiki pages with GitHub-Flavored Markdown. To preview:

- Open files directly in VS Code (built-in markdown preview)
- Or use [`grip`](https://github.com/joeyespo/grip) for an accurate GitHub-style preview:
  ```bash
  pip install grip
  grip wiki/Home.md
  ```

## Conventions

- Use **PascalCase or kebab-case** filenames — they map directly to the wiki URL
- Cross-link with `[Page name](Page-File-Name)` (no `.md` extension)
- Keep `_Sidebar.md` updated when adding new pages

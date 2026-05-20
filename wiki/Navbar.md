# Navbar

Top navigation bar with logo, nav items, optional user menu, and responsive hamburger behavior.

> ⚠️ **Note**: `Navbar` is currently not re-exported from `src/index.ts` (public API). It lives in `src/components/Navbar/` but consumers cannot import it from `vega-react-components` yet. This page documents the component's intended API for upcoming releases.

## Import (when exported)

```tsx
import { Navbar } from "vega-react-components";
```

## `Navbar` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logo` | `ReactNode` | — | Logo or brand element shown on the left. |
| `items` | `NavbarItemProps[]` | `[]` | Navigation items. |
| `userMenu` | `UserMenuProps` | — | Optional user menu (avatar + dropdown). |
| `isMenuOpen` | `boolean` | `false` | Controlled state of the mobile menu (when set, the navbar becomes controlled). |
| `onMenuClick` | `() => void` | — | Fires when the hamburger icon is clicked. If provided, the navbar becomes controlled. |
| `children` | `ReactNode` | — | Optional custom content (e.g. a search bar). |
| `className` | `string` | — | Extra class on the root. |

### `NavbarItemProps`

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | **Required.** Item text. |
| `href` | `string` | If provided, renders as a link. |
| `isActive` | `boolean` | Marks the item as the current page. |
| `onClick` | `() => void` | Click handler. |
| `className` | `string` | Extra class. |

### `UserMenuProps`

| Field | Type | Description |
|-------|------|-------------|
| `avatar` | `string` | Avatar image URL. |
| `userName` | `string` | Display name. |
| `menuItems` | `{ label: string; onClick?: () => void; href?: string }[]` | Dropdown entries. |

## Examples

### Basic

```tsx
<Navbar
  logo={<img src="/logo.svg" alt="Vega" />}
  items={[
    { label: "Home", href: "/", isActive: true },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ]}
/>
```

### With user menu

```tsx
<Navbar
  logo={<span>Vega</span>}
  items={navItems}
  userMenu={{
    avatar: "/me.jpg",
    userName: "Alley",
    menuItems: [
      { label: "Profile", href: "/profile" },
      { label: "Settings", href: "/settings" },
      { label: "Logout", onClick: handleLogout },
    ],
  }}
/>
```

### Controlled mobile menu

```tsx
const [open, setOpen] = useState(false);

<Navbar
  items={navItems}
  isMenuOpen={open}
  onMenuClick={() => setOpen(!open)}
/>
```

### With custom content (search bar)

```tsx
<Navbar logo={logo} items={items}>
  <SearchBar />
</Navbar>
```

## See also

- [Sidebar](Sidebar) — vertical navigation
- [Components](Components) — full component list

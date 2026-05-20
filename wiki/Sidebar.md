# Sidebar

Vertical navigation panel with header / body / footer composition. Supports collapsed/expanded state on desktop and an overlay drawer on mobile.

## Import

```tsx
import { Sidebar, useSidebarContext } from "vega-react-components";
```

## `Sidebar` props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Sidebar content (use sub-components). |
| `defaultExpanded` | `boolean` | `true` | Uncontrolled initial expanded state. |
| `expanded` | `boolean` | — | Controlled expanded state. |
| `onExpandedChange` | `(isExpanded: boolean) => void` | — | Called when expanded state changes. |
| `isOpenMobile` | `boolean` | — | Mobile: whether the overlay drawer is open. |
| `onCloseMobile` | `() => void` | — | Mobile: callback to close the drawer. |
| `onOpenMobile` | `() => void` | — | Mobile: callback to open the drawer. |
| `showMobileTrigger` | `boolean` | `false` | Mobile: show a floating hamburger button. |
| `className` | `string` | — | Extra class on the root. |

## Sub-components

| Sub-component | Purpose |
|---------------|---------|
| `Sidebar.Header` | Top area (logo, app name). |
| `Sidebar.Body` | Main scrollable area (typically holds `Sidebar.Item`). |
| `Sidebar.Footer` | Bottom area (user info, settings). |
| `Sidebar.Item` | A navigation link. Supports `icon`, `href`, `active`, `onClick`, and nested `Sidebar.SubMenu`. |
| `Sidebar.SubMenu` | Container for nested items under a parent `Sidebar.Item`. |
| `Sidebar.Toggle` | Collapse/expand button (desktop). |

### `Sidebar.Item` props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | **Required.** Text label. |
| `icon` | `ReactNode` | Optional icon (typically a `lucide-react` icon). |
| `href` | `string` | If provided, renders as a link. |
| `active` | `boolean` | Marks the item as the current page. |
| `onClick` | `() => void` | Click handler. |
| `children` | `ReactNode` | Nested sub-items (wrap in `Sidebar.SubMenu`). |
| `className` | `string` | Extra class. |

## `useSidebarContext()`

Returns sidebar state for descendants:

```ts
interface SidebarContextValue {
  isExpanded: boolean;
  // ... see Sidebar source for full shape
}
```

## Examples

### Basic

```tsx
import { Home, Settings, User } from "lucide-react";
import { Sidebar } from "vega-react-components";

<Sidebar>
  <Sidebar.Header>My App</Sidebar.Header>

  <Sidebar.Body>
    <Sidebar.Item label="Dashboard" icon={<Home />} href="/" active />
    <Sidebar.Item label="Profile" icon={<User />} href="/profile" />
    <Sidebar.Item label="Settings" icon={<Settings />}>
      <Sidebar.SubMenu>
        <Sidebar.Item label="Account" href="/settings/account" />
        <Sidebar.Item label="Billing" href="/settings/billing" />
      </Sidebar.SubMenu>
    </Sidebar.Item>
  </Sidebar.Body>

  <Sidebar.Footer>
    <Sidebar.Toggle />
  </Sidebar.Footer>
</Sidebar>
```

### Controlled + mobile

```tsx
const [expanded, setExpanded] = useState(true);
const [mobileOpen, setMobileOpen] = useState(false);

<Sidebar
  expanded={expanded}
  onExpandedChange={setExpanded}
  isOpenMobile={mobileOpen}
  onOpenMobile={() => setMobileOpen(true)}
  onCloseMobile={() => setMobileOpen(false)}
  showMobileTrigger
>
  {/* ... */}
</Sidebar>
```

## See also

- [Components](Components) — full component list

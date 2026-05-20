# ModelViewer

Interactive 3D model viewer for `.gltf` / `.glb` files. Built on [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) and [@react-three/drei](https://github.com/pmndrs/drei).

## Import

```tsx
import { ModelViewer } from "vega-react-components";
```

## Props

### Model

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | **Required.** URL of the `.gltf` or `.glb` model. |
| `scale` | `number \| [number, number, number]` | `1` | Uniform or per-axis scale. |
| `rotation` | `[number, number, number]` | `[0, 0, 0]` | Rotation in **degrees** `[x, y, z]`. |
| `position` | `[number, number, number]` | `[0, 0, 0]` | Position offset. |

### Canvas

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number \| string` | `'100%'` | Canvas width. Number → px, string → any CSS unit. |
| `height` | `number \| string` | `400` | Canvas height. |
| `className` | `string` | — | Extra class on the canvas wrapper. |
| `style` | `CSSProperties` | — | Inline styles on the canvas wrapper. |

### Camera

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cameraPosition` | `[number, number, number]` | — | Manual camera position. Disables `autoFrame` when set. |
| `cameraFov` | `number` (degrees) | `50` | Camera field of view. |
| `autoFrame` | `boolean` | `true` | Auto-fit the camera to the model's bounding box on load. |

### Controls

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orbit` | `boolean` | `true` | Enable click-drag rotation. |
| `zoom` | `boolean` | `true` | Enable mouse-wheel zoom. |
| `pan` | `boolean` | `false` | Enable right-click drag panning. |
| `autoRotate` | `boolean` | `false` | Continuously rotate the camera. |
| `autoRotateSpeed` | `number` | `1` | Auto-rotation speed (drei units). |
| `mouseParallax` | `boolean` | `false` | Subtle parallax: model tilts toward the cursor. |
| `mouseParallaxIntensity` | `number` (0–1) | `0.1` | Parallax intensity. |

### Lighting / background

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `environment` | `ModelViewerEnvironment` | `'studio'` | HDR preset for PBR lighting. |
| `background` | `string` | — | Solid background color. Default is transparent. |

`ModelViewerEnvironment`: `'studio' \| 'city' \| 'sunset' \| 'warehouse' \| 'forest' \| 'apartment' \| 'park' \| 'lobby' \| 'night' \| 'dawn'`.

### Fallbacks / events

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loadingFallback` | `ReactNode` | `<Loader />` | Shown while the model loads. |
| `errorFallback` | `ReactNode` | simple text | Shown when loading fails. |
| `onLoad` | `() => void` | — | Fires once the model finishes loading. |
| `onError` | `(error: Error) => void` | — | Fires on load/parse error. |
| `onClick` | `() => void` | — | Fires when the user clicks on the model. |

## Examples

### Basic

```tsx
<ModelViewer src="/models/duck.glb" />
```

### Custom size and rotation

```tsx
<ModelViewer
  src="/models/chair.glb"
  width={600}
  height={500}
  rotation={[0, 45, 0]}
  scale={1.5}
/>
```

### Auto-rotation with environment

```tsx
<ModelViewer
  src="/models/sneaker.glb"
  environment="sunset"
  autoRotate
  autoRotateSpeed={0.8}
  background="#f5f5f5"
/>
```

### Disable interactions

```tsx
<ModelViewer
  src="/models/logo.glb"
  orbit={false}
  zoom={false}
  mouseParallax
  mouseParallaxIntensity={0.15}
/>
```

### Custom fallback

```tsx
<ModelViewer
  src="/models/heavy.glb"
  loadingFallback={<div>Loading model…</div>}
  errorFallback={<div>Could not load the model.</div>}
  onLoad={() => console.log("ready")}
  onError={(err) => console.error(err)}
/>
```

## See also

- [Loader](Loader) — default loading fallback
- [@react-three/drei docs](https://github.com/pmndrs/drei) for environment presets

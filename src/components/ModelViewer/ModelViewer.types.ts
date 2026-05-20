import type { CSSProperties, ReactNode } from 'react';

export type ModelViewerEnvironment =
  | 'studio'
  | 'city'
  | 'sunset'
  | 'warehouse'
  | 'forest'
  | 'apartment'
  | 'park'
  | 'lobby'
  | 'night'
  | 'dawn';

export interface ModelViewerProps {
  /** URL of the .gltf or .glb model to load. */
  src: string;

  /** Canvas width. Number → pixels, string → any CSS unit. Default `'100%'`. */
  width?: number | string;
  /** Canvas height. Number → pixels, string → any CSS unit. Default `400`. */
  height?: number | string;

  /** Uniform or per-axis scale applied to the loaded model. Default `1`. */
  scale?: number | [number, number, number];
  /** Rotation of the model in **degrees** [x, y, z]. Default `[0, 0, 0]`. */
  rotation?: [number, number, number];
  /** Position offset of the model. Default `[0, 0, 0]`. */
  position?: [number, number, number];

  /** Camera position. When provided, disables `autoFrame`. */
  cameraPosition?: [number, number, number];
  /** Camera field of view (degrees). Default `50`. */
  cameraFov?: number;
  /** Auto-fit the camera to the model's bounding box on load. Default `true`. */
  autoFrame?: boolean;

  /** Enable click-drag rotation. Default `true`. */
  orbit?: boolean;
  /** Enable mouse-wheel zoom. Default `true`. */
  zoom?: boolean;
  /** Enable right-click drag panning. Default `false`. */
  pan?: boolean;
  /** Continuously rotate the camera around the model. Default `false`. */
  autoRotate?: boolean;
  /** Auto-rotation speed (drei units). Default `1`. */
  autoRotateSpeed?: number;

  /** Subtle parallax: model tilts toward the mouse cursor. Default `false`. */
  mouseParallax?: boolean;
  /** Parallax intensity (0–1 reasonable range). Default `0.1`. */
  mouseParallaxIntensity?: number;

  /** Drei HDR environment preset for PBR lighting. Default `'studio'`. */
  environment?: ModelViewerEnvironment;
  /** Solid background color. Default `undefined` (transparent canvas). */
  background?: string;

  /** Custom node shown while the model loads. Default `<Loader />`. */
  loadingFallback?: ReactNode;
  /** Custom node shown when loading fails. Default = simple text. */
  errorFallback?: ReactNode;

  /** Fired once the model has finished loading. */
  onLoad?: () => void;
  /** Fired when loading or parsing fails. */
  onError?: (error: Error) => void;
  /** Fired when the user clicks on the model. */
  onClick?: () => void;

  className?: string;
  style?: CSSProperties;
}

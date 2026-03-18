export type LoaderVariant = 'spinner' | 'skeleton' | 'progress';

export interface LoaderProps {
  variant?: LoaderVariant;
  /** progress variant: 0–100. Omit for indeterminate. */
  value?: number;
  /** Render a full-screen backdrop that blocks interaction */
  overlay?: boolean;
  /** Accessible label (visually hidden) */
  label?: string;
  /** skeleton variant: CSS width (e.g. "200px", "100%") */
  width?: string;
  /** skeleton variant: CSS height (e.g. "1rem", "80px") */
  height?: string;
  className?: string;
}

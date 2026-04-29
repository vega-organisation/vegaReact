import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click' | 'contextmenu' | 'both';

export interface TooltipProps {
  /**
   * The element that triggers the tooltip. Must be a single React element so we
   * can attach accessibility + event handlers.
   */
  children: ReactElement;

  /** The tooltip content (text or simple React content). */
  content: ReactNode;

  /** Preferred placement. The tooltip may flip to stay inside the viewport. */
  placement?: TooltipPlacement;

  /** How the tooltip is triggered. */
  trigger?: TooltipTrigger;

  /** Delay (ms) before showing on hover/focus. */
  openDelay?: number;

  /** Controlled open state (optional). */
  open?: boolean;

  /** Callback fired when open state changes (hover/click). */
  onOpenChange?: (open: boolean) => void;

  /** Additional class applied to the tooltip box. */
  className?: string;
}


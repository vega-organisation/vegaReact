import './Tooltip.css';
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { TooltipPlacement, TooltipProps } from './Tooltip.types';

type Coords = {
  top: number;
  left: number;
  placement: TooltipPlacement;
  arrowLeft: number;
  arrowTop: number;
};

const GAP = 8;
const VIEWPORT_PADDING = 8;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getScrollableAncestors(el: Element | null) {
  const ancestors: (Element | Window)[] = [];
  let node: Element | null = el;
  while (node && node.parentElement) {
    node = node.parentElement;
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const overflowX = style.overflowX;
    const canScrollY = overflowY === 'auto' || overflowY === 'scroll';
    const canScrollX = overflowX === 'auto' || overflowX === 'scroll';
    if (canScrollY || canScrollX) ancestors.push(node);
  }
  ancestors.push(window);
  return ancestors;
}

function computeCoords(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  preferredPlacement: TooltipPlacement
): Coords {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const fits = (placement: TooltipPlacement) => {
    switch (placement) {
      case 'top':
        return triggerRect.top - GAP - tooltipRect.height >= VIEWPORT_PADDING;
      case 'bottom':
        return triggerRect.bottom + GAP + tooltipRect.height <= vh - VIEWPORT_PADDING;
      case 'left':
        return triggerRect.left - GAP - tooltipRect.width >= VIEWPORT_PADDING;
      case 'right':
        return triggerRect.right + GAP + tooltipRect.width <= vw - VIEWPORT_PADDING;
    }
  };

  const placement: TooltipPlacement = fits(preferredPlacement)
    ? preferredPlacement
    : preferredPlacement === 'top'
      ? (fits('bottom') ? 'bottom' : 'top')
      : preferredPlacement === 'bottom'
        ? (fits('top') ? 'top' : 'bottom')
        : preferredPlacement === 'left'
          ? (fits('right') ? 'right' : 'left')
          : (fits('left') ? 'left' : 'right');

  let top = 0;
  let left = 0;
  let arrowLeft = 0;
  let arrowTop = 0;

  const centerX = triggerRect.left + triggerRect.width / 2;
  const centerY = triggerRect.top + triggerRect.height / 2;

  if (placement === 'top' || placement === 'bottom') {
    left = centerX - tooltipRect.width / 2;
    left = clamp(left, VIEWPORT_PADDING, vw - VIEWPORT_PADDING - tooltipRect.width);
    top =
      placement === 'top'
        ? triggerRect.top - GAP - tooltipRect.height
        : triggerRect.bottom + GAP;

    top = clamp(top, VIEWPORT_PADDING, vh - VIEWPORT_PADDING - tooltipRect.height);
    arrowLeft = clamp(centerX - left - 5, 8, tooltipRect.width - 18);
    arrowTop = placement === 'top' ? tooltipRect.height - 5 : -5;
  } else {
    top = centerY - tooltipRect.height / 2;
    top = clamp(top, VIEWPORT_PADDING, vh - VIEWPORT_PADDING - tooltipRect.height);
    left =
      placement === 'left'
        ? triggerRect.left - GAP - tooltipRect.width
        : triggerRect.right + GAP;

    left = clamp(left, VIEWPORT_PADDING, vw - VIEWPORT_PADDING - tooltipRect.width);
    arrowTop = clamp(centerY - top - 5, 8, tooltipRect.height - 18);
    arrowLeft = placement === 'left' ? tooltipRect.width - 5 : -5;
  }

  return { top, left, placement, arrowLeft, arrowTop };
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement: placementProp = 'top',
  trigger = 'hover',
  openDelay = 350,
  open,
  onOpenChange,
  className = '',
}) => {
  const tooltipId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const showTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);

  const isOpen = open ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (open === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [onOpenChange, open]
  );

  const clearTimers = useCallback(() => {
    if (showTimer.current) window.clearTimeout(showTimer.current);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    showTimer.current = null;
    hideTimer.current = null;
  }, []);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    showTimer.current = window.setTimeout(() => setOpen(true), openDelay);
  }, [clearTimers, openDelay, setOpen]);

  const closeNow = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, [clearTimers, setOpen]);

  const toggleClick = useCallback(() => {
    clearTimers();
    setOpen(!isOpen);
  }, [clearTimers, isOpen, setOpen]);

  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!triggerEl || !tooltipEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();
    setCoords(computeCoords(triggerRect, tooltipRect, placementProp));
  }, [placementProp]);

  // Compute position once tooltip is mounted and whenever it changes size/content.
  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [content, isOpen, updatePosition]);

  // Keep position correct on scroll/resize while open.
  useEffect(() => {
    if (!isOpen) return;
    updatePosition();

    const triggerEl = triggerRef.current;
    const ancestors = getScrollableAncestors(triggerEl);
    const onMove = () => updatePosition();
    ancestors.forEach((a) => a.addEventListener('scroll', onMove, { passive: true } as AddEventListenerOptions));
    window.addEventListener('resize', onMove);

    return () => {
      ancestors.forEach((a) => a.removeEventListener('scroll', onMove as EventListener));
      window.removeEventListener('resize', onMove);
    };
  }, [isOpen, updatePosition]);

  // Close on outside click / Escape for click-trigger tooltips.
  useEffect(() => {
    if (!isOpen || (trigger !== 'click' && trigger !== 'both' && trigger !== 'contextmenu')) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNow();
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      const triggerEl = triggerRef.current;
      const tooltipEl = tooltipRef.current;
      if (!target || !triggerEl || !tooltipEl) return;
      if (triggerEl.contains(target) || tooltipEl.contains(target)) return;
      closeNow();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [closeNow, isOpen, trigger]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const triggerProps = useMemo(() => {
    const base: Record<string, unknown> = {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
        const childRef = (children as unknown as { ref?: React.Ref<HTMLElement> }).ref;
        if (typeof childRef === 'function') childRef(node);
        else if (childRef && typeof childRef === 'object' && 'current' in childRef) {
          (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      'aria-describedby': isOpen ? tooltipId : undefined,
    };

    if (trigger === 'hover') {
      return {
        ...base,
        onMouseEnter: (e: React.MouseEvent) => {
          (children.props as { onMouseEnter?: (e: React.MouseEvent) => void }).onMouseEnter?.(e);
          scheduleOpen();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          (children.props as { onMouseLeave?: (e: React.MouseEvent) => void }).onMouseLeave?.(e);
          closeNow();
        },
        onFocus: (e: React.FocusEvent) => {
          (children.props as { onFocus?: (e: React.FocusEvent) => void }).onFocus?.(e);
          scheduleOpen();
        },
        onBlur: (e: React.FocusEvent) => {
          (children.props as { onBlur?: (e: React.FocusEvent) => void }).onBlur?.(e);
          closeNow();
        },
      };
    }

    const clickHandlers = {
      onClick: (e: React.MouseEvent) => {
        (children.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
        toggleClick();
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        (children.props as { onKeyDown?: (e: React.KeyboardEvent) => void }).onKeyDown?.(e);
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleClick();
        }
      },
    };

    const contextMenuHandlers = {
      onContextMenu: (e: React.MouseEvent) => {
        (children.props as { onContextMenu?: (e: React.MouseEvent) => void }).onContextMenu?.(e);
        e.preventDefault();
        toggleClick();
      },
    };

    if (trigger === 'both') {
      return {
        ...base,
        onMouseEnter: (e: React.MouseEvent) => {
          (children.props as { onMouseEnter?: (e: React.MouseEvent) => void }).onMouseEnter?.(e);
          scheduleOpen();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          (children.props as { onMouseLeave?: (e: React.MouseEvent) => void }).onMouseLeave?.(e);
          closeNow();
        },
        onFocus: (e: React.FocusEvent) => {
          (children.props as { onFocus?: (e: React.FocusEvent) => void }).onFocus?.(e);
          scheduleOpen();
        },
        onBlur: (e: React.FocusEvent) => {
          (children.props as { onBlur?: (e: React.FocusEvent) => void }).onBlur?.(e);
          closeNow();
        },
        ...clickHandlers,
      };
    }

    if (trigger === 'contextmenu') {
      return { ...base, ...contextMenuHandlers };
    }

    return { ...base, ...clickHandlers };
  }, [children, closeNow, isOpen, scheduleOpen, toggleClick, tooltipId, trigger]);

  const tooltipClasses = ['vega-tooltip', isOpen ? 'vega-tooltip--open' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {cloneElement(children, triggerProps)}
      {isOpen && content
        ? createPortal(
            <div
              ref={tooltipRef}
              id={tooltipId}
              role="tooltip"
              className={tooltipClasses}
              style={{
                top: coords?.top ?? -9999,
                left: coords?.left ?? -9999,
              }}
            >
              {content}
              {coords ? (
                <span
                  className={[
                    'vega-tooltip__arrow',
                    `vega-tooltip__arrow--${coords.placement}`,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{
                    left:
                      coords.placement === 'top' || coords.placement === 'bottom'
                        ? coords.arrowLeft
                        : undefined,
                    top:
                      coords.placement === 'left' || coords.placement === 'right'
                        ? coords.arrowTop
                        : undefined,
                  }}
                />
              ) : null}
            </div>,
            document.body
          )
        : null}
    </>
  );
};

Tooltip.displayName = 'Tooltip';


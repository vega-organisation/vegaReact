import React from 'react';
import type { LoaderProps } from './Loader.types';
import './Loader.css';

const Spinner: React.FC<{ label: string }> = ({ label }) => (
  <div className="vega-loader-spinner" role="status" aria-label={label}>
    <span className="vega-sr-only">{label}</span>
  </div>
);

const Skeleton: React.FC<{ width?: string; height?: string }> = ({
  width = '100%',
  height = '1rem',
}) => (
  <div
    className="vega-loader-skeleton"
    style={{ width, height }}
    role="status"
    aria-busy="true"
    aria-label="Loading…"
  />
);

const Progress: React.FC<{ value?: number; label: string }> = ({ value, label }) => {
  const isIndeterminate = value === undefined;
  return (
    <div
      className="vega-loader-progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={isIndeterminate ? undefined : 0}
      aria-valuemax={isIndeterminate ? undefined : 100}
    >
      <div
        className={[
          'vega-loader-progress-bar',
          isIndeterminate ? 'vega-loader-progress-bar--indeterminate' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={isIndeterminate ? undefined : { width: `${value}%` }}
      />
    </div>
  );
};

export const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  value,
  overlay = false,
  label = 'Loading…',
  width,
  height,
  className = '',
}) => {
  const inner = (
    <div
      className={[
        'vega-loader',
        `vega-loader--${variant}`,
        overlay ? 'vega-loader--overlay-inner' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {variant === 'spinner' && <Spinner label={label} />}
      {variant === 'skeleton' && <Skeleton width={width} height={height} />}
      {variant === 'progress' && <Progress value={value} label={label} />}
    </div>
  );

  if (overlay) {
    return (
      <div className="vega-loader-overlay" aria-busy="true" aria-label={label}>
        {inner}
      </div>
    );
  }

  return inner;
};

Loader.displayName = 'Loader';

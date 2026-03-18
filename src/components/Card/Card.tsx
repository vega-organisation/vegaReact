import React from 'react';
import type {
  CardBodyProps,
  CardFooterProps,
  CardHeaderProps,
  CardMediaProps,
  CardProps,
} from './Card.types';
import './Card.css';

type CardComponent = React.FC<CardProps> & {
  Media: React.FC<CardMediaProps>;
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
};

const RATIO_CLASS: Record<NonNullable<CardMediaProps['ratio']>, string> = {
  '16/9': 'vega-card-media--16-9',
  '4/3': 'vega-card-media--4-3',
  '1/1': 'vega-card-media--1-1',
  '3/4': 'vega-card-media--3-4',
};

export const Card: CardComponent = ({
  variant = 'default',
  onClick,
  children,
  className = '',
  ...props
}) => {
  const isInteractive = variant === 'interactive' || !!onClick;

  const cardClasses = [
    'vega-card',
    `vega-card--${variant}`,
    isInteractive ? 'vega-card--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

const CardMedia: React.FC<CardMediaProps> = ({
  src,
  alt = '',
  ratio = '16/9',
  className = '',
}) => (
  <div
    className={['vega-card-media', RATIO_CLASS[ratio], className]
      .filter(Boolean)
      .join(' ')}
  >
    <img src={src} alt={alt} className="vega-card-media-img" />
  </div>
);
CardMedia.displayName = 'Card.Media';

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-card-header', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
CardHeader.displayName = 'Card.Header';

const CardBody: React.FC<CardBodyProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-card-body', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
CardBody.displayName = 'Card.Body';

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '', ...props }) => (
  <div className={['vega-card-footer', className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
CardFooter.displayName = 'Card.Footer';

Card.Media = CardMedia;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

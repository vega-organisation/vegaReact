import type { CardProps } from "./Card.types";
import "./Card.css";

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  headerImage,
  imageRatio = "16:9",
  title,
  subtitle,
  padding = "medium",
  selected = false,
  disabled = false,
  className = "",
  onClick,
  ...props
}) => {
  const isInteractive = !!onClick;

  const classes = [
    "vega-card",
    `vega-card--${variant}`,
    `vega-card--padding-${padding}`,
    isInteractive ? "vega-card--interactive" : "",
    selected ? "vega-card--selected" : "",
    disabled ? "vega-card--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  const Element = isInteractive ? "article" : "div";
  const role = isInteractive ? "button" : undefined;
  const tabIndex = isInteractive && !disabled ? 0 : undefined;

  return (
    <Element
      className={classes}
      onClick={isInteractive ? handleClick : undefined}
      role={role}
      tabIndex={tabIndex}
      aria-disabled={disabled ? true : undefined}
      {...props}
    >
      {headerImage && (
        <div className={`vega-card__header vega-card__header--${imageRatio}`}>
          <img
            src={headerImage}
            alt={title || "Card header image"}
            className="vega-card__header-image"
          />
        </div>
      )}
      <div className="vega-card__content">
        {title && <h3 className="vega-card__title">{title}</h3>}
        {subtitle && <p className="vega-card__subtitle">{subtitle}</p>}
        {children}
      </div>
    </Element>
  );
};

Card.displayName = "Card";

import type { ButtonProps } from "./Button.types";
import "./Button.css";

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  icon,
  iconPos = "left",
  outline = false,
  ...props
}) => {
  const classNames = [
    "vega-button",
    `vega-button--${variant}`,
    `vega-button--${size}`,
    fullWidth ? "vega-button--full-width" : "",
    icon ? "vega-button--with-icon" : "",
    icon ? `vega-button--icon-${iconPos}` : "",
    outline ? "vega-button--outline" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} {...props}>
      {icon ? <span className="vega-button__icon">{icon}</span> : null}
      {children ? <span className="vega-button__label">{children}</span> : null}
    </button>
  );
};

Button.displayName = "Button";

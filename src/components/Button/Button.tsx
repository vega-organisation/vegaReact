import type { ButtonProps } from "./Button.types";
import "./Button.css";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}) => {
  const classes = [
    "vega-button",
    `vega-button--${variant}`,
    `vega-button--${size}`,
    fullWidth ? "vega-button--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

Button.displayName = "Button";

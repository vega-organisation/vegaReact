import type { CheckboxProps } from "./Checkbox.types";
import "./Checkbox.css";

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  size = "small",
  indeterminate = false,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.checked);
  };

  return (
    <div className="vega-checkbox">
      <input
        className="vega-checkbox__input"
        type="checkbox"
        checked={indeterminate ? false : undefined}
        onChange={handleChange}
      />
      <label className={`vega-checkbox__label vega-checkbox__label--${size}`}>
        {label}
        {description && (
          <span className="vega-checkbox__description">{description}</span>
        )}
      </label>
    </div>
  );
};

Checkbox.displayName = "Checkbox";

import type { InputHTMLAttributes, ReactNode } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  description?: ReactNode;
  size?: "small" | "medium" | "large";
  indeterminate?: boolean;
  error?: string;
  fullWidth?: boolean;
}

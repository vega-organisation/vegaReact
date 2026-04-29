import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(<Checkbox label="Newsletter" description="Weekly updates" />);
    expect(screen.getByText("Weekly updates")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-describedby");
  });

  it("calls onChange on click", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Check" onChange={handleChange} />);
    await user.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledOnce();
  });

  it("supports controlled checked state", () => {
    render(<Checkbox label="Controlled" checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("supports uncontrolled with defaultChecked", () => {
    render(<Checkbox label="Uncontrolled" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("can be disabled", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Disabled" disabled onChange={handleChange} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("handles indeterminate state", () => {
    render(<Checkbox label="Indeterminate" indeterminate />);
    const checkbox = screen.getByRole("checkbox");
    expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
    expect(checkbox).toHaveAttribute("aria-checked", "mixed");
  });

  it("displays error state and message", () => {
    render(<Checkbox label="Terms" error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("applies size class", () => {
    const { container } = render(<Checkbox label="Small" size="small" />);
    expect(container.firstChild).toHaveClass("vega-checkbox--small");
  });

  it("applies fullWidth class", () => {
    const { container } = render(<Checkbox label="Full" fullWidth />);
    expect(container.firstChild).toHaveClass("vega-checkbox--full-width");
  });

  it("uses provided id", () => {
    render(<Checkbox id="my-checkbox" label="Custom ID" />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("id", "my-checkbox");
  });
});

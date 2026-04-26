import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "@/components/ui/Select";

const OPTIONS = [
  { label: "Alive", value: "alive" },
  { label: "Dead", value: "dead" },
];

describe("Select", () => {
  it("renders options", () => {
    render(<Select value="" onChange={vi.fn()} options={OPTIONS} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
    expect(screen.getByText("Dead")).toBeInTheDocument();
  });

  it("renders placeholder option", () => {
    render(<Select value="" onChange={vi.fn()} options={OPTIONS} placeholder="All statuses" />);
    expect(screen.getByText("All statuses")).toBeInTheDocument();
  });

  it("calls onChange with selected value", () => {
    const onChange = vi.fn();
    render(<Select value="" onChange={onChange} options={OPTIONS} />);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "alive" } });
    expect(onChange).toHaveBeenCalledWith("alive");
  });

  it("reflects current value", () => {
    render(<Select value="dead" onChange={vi.fn()} options={OPTIONS} />);
    expect(screen.getByRole<HTMLSelectElement>("combobox").value).toBe("dead");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CharacterFiltersBar } from "@/components/characters/CharacterFiltersBar";

const DEFAULT_FILTERS = { name: "", status: "", species: "", gender: "" };

describe("CharacterFiltersBar", () => {
  it("renders all filter controls", () => {
    render(<CharacterFiltersBar filters={DEFAULT_FILTERS} onChange={vi.fn()} />);
    expect(screen.getByPlaceholderText("Search characters...")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Species")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
  });

  it("calls onChange with updated name", () => {
    const onChange = vi.fn();
    render(<CharacterFiltersBar filters={DEFAULT_FILTERS} onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("Search characters..."), {
      target: { value: "Rick" },
    });
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, name: "Rick" });
  });

  it("calls onChange with updated status", () => {
    const onChange = vi.fn();
    render(<CharacterFiltersBar filters={DEFAULT_FILTERS} onChange={onChange} />);
    const selects = screen.getAllByRole("combobox");
    fireEvent.change(selects[0]!, { target: { value: "alive" } });
    expect(onChange).toHaveBeenCalledWith({ ...DEFAULT_FILTERS, status: "alive" });
  });

  it("renders with data-testid", () => {
    render(<CharacterFiltersBar filters={DEFAULT_FILTERS} onChange={vi.fn()} />);
    expect(screen.getByTestId("character-filters")).toBeInTheDocument();
  });
});

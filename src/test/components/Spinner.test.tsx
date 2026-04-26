import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner, PageSpinner } from "@/components/ui/Spinner";

describe("Spinner", () => {
  it("renders with role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies sm size class", () => {
    render(<Spinner size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("h-4", "w-4");
  });

  it("applies lg size class", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("h-12", "w-12");
  });

  it("applies custom className", () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole("status")).toHaveClass("my-spinner");
  });
});

describe("PageSpinner", () => {
  it("renders the traversal message", () => {
    render(<PageSpinner />);
    expect(screen.getByText("Traversing the multiverse...")).toBeInTheDocument();
  });
});

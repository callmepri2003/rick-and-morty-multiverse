import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText("Hello Card")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-class">content</Card>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("adds hover classes when hover prop is true", () => {
    const { container } = render(<Card hover>content</Card>);
    expect(container.firstChild).toHaveClass("hover:border-portal-teal/50");
  });

  it("does not add hover classes by default", () => {
    const { container } = render(<Card>content</Card>);
    expect(container.firstChild).not.toHaveClass("hover:border-portal-teal/50");
  });
});

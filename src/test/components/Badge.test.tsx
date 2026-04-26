import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>Alive</Badge>);
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("applies green variant classes", () => {
    render(<Badge variant="green">Alive</Badge>);
    const badge = screen.getByText("Alive");
    expect(badge.className).toContain("bg-green-900");
  });

  it("applies red variant classes", () => {
    render(<Badge variant="red">Dead</Badge>);
    const badge = screen.getByText("Dead");
    expect(badge.className).toContain("bg-red-900");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">Test</Badge>);
    expect(screen.getByText("Test").className).toContain("custom-class");
  });
});

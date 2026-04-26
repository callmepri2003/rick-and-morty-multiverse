import { describe, it, expect } from "vitest";
import { cn, statusColor, statusDot, formatAirDate } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "end")).toBe("base end");
  });
});

describe("statusColor", () => {
  it("returns green for Alive", () => {
    expect(statusColor("Alive")).toBe("text-portal-green");
  });

  it("returns red for Dead", () => {
    expect(statusColor("Dead")).toBe("text-red-400");
  });

  it("returns gray for unknown", () => {
    expect(statusColor("unknown")).toBe("text-gray-400");
  });
});

describe("statusDot", () => {
  it("returns green dot for Alive", () => {
    expect(statusDot("Alive")).toBe("bg-portal-green");
  });

  it("returns red dot for Dead", () => {
    expect(statusDot("Dead")).toBe("bg-red-400");
  });
});

describe("formatAirDate", () => {
  it("formats a valid date string", () => {
    const result = formatAirDate("December 2, 2013");
    expect(result).toMatch(/Dec/);
    expect(result).toMatch(/2013/);
  });

  it("returns original string for invalid date", () => {
    expect(formatAirDate("not-a-date")).toBe("not-a-date");
  });
});

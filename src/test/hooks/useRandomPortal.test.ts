import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useRandomPortal } from "@/hooks/useRandomPortal";

describe("useRandomPortal", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts with no result and not spinning", () => {
    const { result } = renderHook(() => useRandomPortal());
    expect(result.current.result).toBeNull();
    expect(result.current.isSpinning).toBe(false);
  });

  it("sets isSpinning to true immediately when spin is called", () => {
    const { result } = renderHook(() => useRandomPortal());
    act(() => {
      result.current.spin("character");
    });
    expect(result.current.isSpinning).toBe(true);
  });

  it("resolves with a valid character id after delay", async () => {
    const { result } = renderHook(() => useRandomPortal());
    act(() => {
      result.current.spin("character");
    });
    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(result.current.isSpinning).toBe(false);
    expect(result.current.result?.type).toBe("character");
    expect(result.current.result?.id).toBeGreaterThanOrEqual(1);
    expect(result.current.result?.id).toBeLessThanOrEqual(826);
  });

  it("resolves with a valid episode id", () => {
    const { result } = renderHook(() => useRandomPortal());
    act(() => result.current.spin("episode"));
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.result?.type).toBe("episode");
    expect(result.current.result?.id).toBeGreaterThanOrEqual(1);
    expect(result.current.result?.id).toBeLessThanOrEqual(51);
  });

  it("resolves with a valid location id", () => {
    const { result } = renderHook(() => useRandomPortal());
    act(() => result.current.spin("location"));
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.result?.type).toBe("location");
    expect(result.current.result?.id).toBeGreaterThanOrEqual(1);
    expect(result.current.result?.id).toBeLessThanOrEqual(126);
  });

  it("reset clears the result and spinning state", () => {
    const { result } = renderHook(() => useRandomPortal());
    act(() => result.current.spin("character"));
    act(() => vi.advanceTimersByTime(800));
    expect(result.current.result).not.toBeNull();
    act(() => result.current.reset());
    expect(result.current.result).toBeNull();
    expect(result.current.isSpinning).toBe(false);
  });
});

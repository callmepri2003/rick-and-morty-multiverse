import { useState, useCallback } from "react";

export type PortalTarget = "character" | "episode" | "location";

const TOTALS: Record<PortalTarget, number> = {
  character: 826,
  episode: 51,
  location: 126,
};

export interface PortalResult {
  type: PortalTarget;
  id: number;
}

export function useRandomPortal() {
  const [result, setResult] = useState<PortalResult | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = useCallback((type: PortalTarget = randomType()) => {
    setIsSpinning(true);
    setResult(null);
    setTimeout(() => {
      const id = Math.floor(Math.random() * TOTALS[type]) + 1;
      setResult({ type, id });
      setIsSpinning(false);
    }, 800);
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setIsSpinning(false);
  }, []);

  return { result, isSpinning, spin, reset };
}

function randomType(): PortalTarget {
  const types: PortalTarget[] = ["character", "episode", "location"];
  return types[Math.floor(Math.random() * types.length)]!;
}

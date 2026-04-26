import { useNavigate } from "react-router-dom";
import { useRandomPortal, PortalTarget } from "@/hooks/useRandomPortal";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import { useEffect } from "react";

const TARGET_LABELS: Record<PortalTarget, string> = {
  character: "Character",
  episode: "Episode",
  location: "Location",
};

const TARGET_ROUTES: Record<PortalTarget, (id: number) => string> = {
  character: (id) => `/characters/${id}`,
  episode: (id) => `/episodes?highlight=${id}`,
  location: (id) => `/locations?highlight=${id}`,
};

export function RandomPortal() {
  const { result, isSpinning, spin, reset } = useRandomPortal();
  const navigate = useNavigate();

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        navigate(TARGET_ROUTES[result.type](result.id));
        reset();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [result, navigate, reset]);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={() => spin()}
        disabled={isSpinning}
        aria-label="Open random portal"
        className={cn(
          "group relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200",
          "border-2 border-portal-teal bg-portal-teal/10 hover:bg-portal-teal/20",
          "hover:shadow-lg hover:shadow-portal-teal/40",
          isSpinning && "cursor-not-allowed opacity-80"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full border-2 border-portal-green opacity-0 transition-all",
            isSpinning && "animate-portal-spin opacity-60"
          )}
        />
        <Zap
          className={cn(
            "h-6 w-6 text-portal-teal transition-transform group-hover:scale-110",
            isSpinning && "animate-pulse"
          )}
        />
      </button>
      <p className="text-xs text-gray-500">
        {isSpinning ? "Opening portal..." : "Random portal"}
      </p>
    </div>
  );
}

export function RandomPortalButton({ type }: { type: PortalTarget }) {
  const { isSpinning, spin } = useRandomPortal();
  const navigate = useNavigate();
  const { result, reset } = useRandomPortal();

  useEffect(() => {
    if (result) {
      navigate(TARGET_ROUTES[result.type](result.id));
      reset();
    }
  }, [result, navigate, reset]);

  return (
    <button
      onClick={() => spin(type)}
      disabled={isSpinning}
      className="flex items-center gap-1.5 rounded-lg border border-portal-border px-3 py-1.5 text-xs text-gray-400 transition-all hover:border-portal-teal hover:text-portal-teal disabled:opacity-50"
    >
      <Zap className="h-3 w-3" />
      Random {TARGET_LABELS[type]}
    </button>
  );
}

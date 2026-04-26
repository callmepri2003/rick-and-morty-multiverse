import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "green" | "red" | "gray" | "teal";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "green" && "bg-green-900/50 text-portal-green border border-portal-green/30",
        variant === "red" && "bg-red-900/50 text-red-400 border border-red-400/30",
        variant === "gray" && "bg-gray-800 text-gray-400 border border-gray-700",
        variant === "teal" && "bg-teal-900/50 text-portal-teal border border-portal-teal/30",
        variant === "default" && "bg-gray-800 text-gray-300 border border-gray-700",
        className
      )}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-portal-border bg-portal-card p-4",
        hover &&
          "transition-all duration-200 hover:border-portal-teal/50 hover:shadow-lg hover:shadow-portal-teal/10",
        className
      )}
    >
      {children}
    </div>
  );
}

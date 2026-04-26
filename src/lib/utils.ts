import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusColor(status: string) {
  switch (status) {
    case "Alive":
      return "text-portal-green";
    case "Dead":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export function statusDot(status: string) {
  switch (status) {
    case "Alive":
      return "bg-portal-green";
    case "Dead":
      return "bg-red-400";
    default:
      return "bg-gray-400";
  }
}

export function formatAirDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

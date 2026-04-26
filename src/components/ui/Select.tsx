"use client";

import { cn } from "@/lib/utils";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({ value, onChange, options, placeholder, className }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "rounded-lg border border-portal-border bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none transition-colors focus:border-portal-teal focus:ring-1 focus:ring-portal-teal",
        className
      )}
    >
      {placeholder && (
        <option value="" className="bg-gray-900">
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-gray-900">
          {opt.label}
        </option>
      ))}
    </select>
  );
}

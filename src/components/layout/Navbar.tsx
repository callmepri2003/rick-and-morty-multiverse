import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, MapPin, Tv, BarChart3 } from "lucide-react";

const navItems = [
  { href: "/characters", label: "Characters", icon: Users },
  { href: "/episodes", label: "Episodes", icon: Tv },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/stats", label: "Stats", icon: BarChart3 },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-portal-border bg-portal-dark/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 animate-portal-spin rounded-full bg-gradient-to-r from-portal-green via-portal-teal to-portal-green opacity-80" />
            <div className="absolute inset-1 rounded-full bg-portal-dark" />
            <div className="absolute inset-2 rounded-full bg-portal-teal/60" />
          </div>
          <span className="font-bold text-white transition-colors group-hover:text-portal-teal">
            Multiverse<span className="text-portal-teal">DB</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                pathname.startsWith(href)
                  ? "bg-portal-teal/10 text-portal-teal"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

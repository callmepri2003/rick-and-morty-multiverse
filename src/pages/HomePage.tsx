import { Link } from "react-router-dom";
import { Users, Tv, MapPin, BarChart3, Zap } from "lucide-react";
import { RandomPortal } from "@/components/RandomPortal";

const features = [
  {
    to: "/characters",
    icon: Users,
    title: "Characters",
    description: "Browse 826 unique characters. Filter by status, species, and gender.",
  },
  {
    to: "/episodes",
    icon: Tv,
    title: "Episodes",
    description: "All 5 seasons with cast lists, air dates, and episode codes.",
  },
  {
    to: "/locations",
    icon: MapPin,
    title: "Locations",
    description: "126 dimensions, planets, and realities — with their residents.",
  },
  {
    to: "/stats",
    icon: BarChart3,
    title: "Statistics",
    description: "Survival rates, species breakdowns, and multiverse analytics.",
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-14 text-center md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#00b5cc22_0%,_transparent_70%)]" />
        <div className="relative mx-auto max-w-4xl px-4">
          <div className="mb-6 flex justify-center">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 animate-portal-spin rounded-full bg-gradient-to-r from-portal-green via-portal-teal to-portal-green opacity-70" />
              <div className="absolute inset-2 rounded-full bg-portal-dark" />
              <div className="absolute inset-4 animate-portal-spin rounded-full bg-portal-teal/80 [animation-direction:reverse]" />
              <div className="absolute inset-6 rounded-full bg-portal-dark" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Multiverse<span className="text-portal-teal">DB</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 sm:text-xl">
            The interdimensional database for Rick &amp; Morty enthusiasts
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">
            826 characters · 51 episodes · 126 locations · infinite dimensions
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/characters"
              className="flex items-center gap-2 rounded-lg bg-portal-teal px-6 py-3 font-semibold text-black transition-all hover:bg-portal-teal/80 hover:shadow-lg hover:shadow-portal-teal/30"
            >
              <Zap className="h-4 w-4" />
              Open Portal
            </Link>
            <Link
              to="/stats"
              className="flex items-center gap-2 rounded-lg border border-portal-border px-6 py-3 font-semibold text-gray-300 transition-all hover:border-portal-teal hover:text-portal-teal"
            >
              View Stats
            </Link>
          </div>
          <div className="mt-8 flex justify-center">
            <RandomPortal />
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ to, icon: Icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-xl border border-portal-border bg-portal-card p-6 transition-all duration-200 hover:border-portal-teal/50 hover:shadow-lg hover:shadow-portal-teal/10"
            >
              <div className="mb-4 inline-flex rounded-lg bg-gray-800 p-3 transition-colors group-hover:bg-portal-teal/10">
                <Icon className="h-6 w-6 text-portal-teal" />
              </div>
              <h2 className="text-lg font-bold text-white transition-colors group-hover:text-portal-teal">
                {title}
              </h2>
              <p className="mt-2 text-sm text-gray-400">{description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

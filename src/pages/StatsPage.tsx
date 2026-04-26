import { useCharacters } from "@/hooks/useCharacters";
import { useAllEpisodes } from "@/hooks/useEpisodes";
import { useLocations } from "@/hooks/useLocations";
import { Card } from "@/components/ui/Card";
import { PageSpinner } from "@/components/ui/Spinner";
import { BarChart3, Users, Tv, MapPin, TrendingUp, Skull, Heart, HelpCircle } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#00b5cc", "#39ff14", "#8b5cf6", "#f59e0b", "#ef4444"];

interface TooltipPayload {
  value: number;
  name: string;
  payload?: { name?: string; title?: string; chars?: number };
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-portal-border bg-portal-card px-3 py-2 text-sm shadow-xl">
      {label && <p className="mb-1 font-semibold text-gray-300">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} style={{ color: "#00b5cc" }}>
          {p.name}: <span className="font-bold text-white">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = "text-portal-teal",
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <Card className="flex items-center gap-3">
      <div className="shrink-0 rounded-lg bg-gray-800 p-2.5">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold text-white sm:text-2xl">{value}</p>
        <p className="truncate text-xs text-gray-400 sm:text-sm">{label}</p>
        {sub && <p className="hidden text-xs text-gray-600 sm:block">{sub}</p>}
      </div>
    </Card>
  );
}

export function StatsPage() {
  const { data: aliveData } = useCharacters({ status: "alive" });
  const { data: deadData } = useCharacters({ status: "dead" });
  const { data: unknownData } = useCharacters({ status: "unknown" });
  const { data: allChars } = useCharacters({ page: 1 });
  const { data: episodes } = useAllEpisodes();
  const { data: locations } = useLocations();

  const isLoading = !allChars || !episodes || !locations;
  if (isLoading) return <PageSpinner />;

  const totalChars = allChars.info.count;
  const aliveCount = aliveData?.info.count ?? 0;
  const deadCount = deadData?.info.count ?? 0;
  const unknownCount = unknownData?.info.count ?? 0;
  const totalEps = episodes.length;
  const totalLocs = locations.info.count;

  const statusData = [
    { name: "Alive", value: aliveCount },
    { name: "Dead", value: deadCount },
    { name: "Unknown", value: unknownCount },
  ];

  const episodesBySeason = episodes.reduce<Record<string, number>>((acc, ep) => {
    const match = ep.episode.match(/S(\d+)/i);
    if (match) {
      const key = `S${match[1]}`;
      acc[key] = (acc[key] ?? 0) + 1;
    }
    return acc;
  }, {});

  const seasonData = Object.entries(episodesBySeason)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([season, count]) => ({ season, episodes: count }));

  const charCounts = episodes.map((ep) => ep.characters.length);
  const avgCharsPerEp = Math.round(charCounts.reduce((a, b) => a + b, 0) / charCounts.length);
  const maxCharsEp = episodes.reduce((a, b) =>
    a.characters.length > b.characters.length ? a : b
  );

  const topEpisodes = [...episodes]
    .sort((a, b) => b.characters.length - a.characters.length)
    .slice(0, 10)
    .map((ep) => ({ name: ep.episode, chars: ep.characters.length, title: ep.name }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <BarChart3 className="h-7 w-7 text-portal-teal" />
        <div>
          <h1 className="text-2xl font-bold text-white">Multiverse Statistics</h1>
          <p className="text-sm text-gray-500">Data-driven insights from across all dimensions</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Characters" value={totalChars.toLocaleString()} />
        <StatCard icon={Tv} label="Total Episodes" value={totalEps} sub="Across 5 seasons" />
        <StatCard icon={MapPin} label="Locations" value={totalLocs} sub="Dimensions & places" />
        <StatCard
          icon={TrendingUp}
          label="Avg Cast / Episode"
          value={avgCharsPerEp}
          sub={`Max: ${maxCharsEp.characters.length} (${maxCharsEp.episode})`}
          color="text-yellow-400"
        />
      </div>

      {/* Survival breakdown */}
      <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
        <Card className="text-center">
          <Heart className="mx-auto mb-2 h-6 w-6 text-portal-green" />
          <p className="text-2xl font-bold text-portal-green">{aliveCount}</p>
          <p className="text-sm text-gray-400">Alive</p>
          <p className="text-xs text-gray-600">{Math.round((aliveCount / totalChars) * 100)}%</p>
        </Card>
        <Card className="text-center">
          <Skull className="mx-auto mb-2 h-6 w-6 text-red-400" />
          <p className="text-2xl font-bold text-red-400">{deadCount}</p>
          <p className="text-sm text-gray-400">Dead</p>
          <p className="text-xs text-gray-600">{Math.round((deadCount / totalChars) * 100)}%</p>
        </Card>
        <Card className="text-center">
          <HelpCircle className="mx-auto mb-2 h-6 w-6 text-gray-400" />
          <p className="text-2xl font-bold text-gray-400">{unknownCount}</p>
          <p className="text-sm text-gray-400">Unknown</p>
          <p className="text-xs text-gray-600">
            {Math.round((unknownCount / totalChars) * 100)}%
          </p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status pie */}
        <Card>
          <h2 className="mb-4 font-semibold text-gray-300">Character Status Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => (
                  <span className="text-sm text-gray-300">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Episodes per season */}
        <Card>
          <h2 className="mb-4 font-semibold text-gray-300">Episodes per Season</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={seasonData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <XAxis dataKey="season" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="episodes" name="Episodes" radius={[4, 4, 0, 0]}>
                {seasonData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top episodes by cast */}
        <Card className="lg:col-span-2">
          <h2 className="mb-4 font-semibold text-gray-300">Top 10 Episodes by Cast Size</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topEpisodes}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
            >
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                width={50}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload as { title: string; chars: number };
                  return (
                    <div className="rounded-lg border border-portal-border bg-portal-card px-3 py-2 text-sm shadow-xl">
                      <p className="font-semibold text-gray-300">{d.title}</p>
                      <p className="text-portal-teal">
                        Characters:{" "}
                        <span className="font-bold text-white">{d.chars}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="chars" name="Characters" fill="#00b5cc" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

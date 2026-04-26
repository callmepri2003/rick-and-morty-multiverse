import { Link, useParams } from "react-router-dom";
import { useCharacter } from "@/hooks/useCharacters";
import { useEpisodesBatch } from "@/hooks/useEpisodes";
import { extractId, parseSeasonEpisode } from "@/lib/api";
import { statusColor, statusDot, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageSpinner } from "@/components/ui/Spinner";
import { ArrowLeft, MapPin, Tv, ExternalLink } from "lucide-react";

export function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading } = useCharacter(parseInt(id ?? "0", 10));

  const episodeIds = character?.episode.map(extractId) ?? [];
  const { data: episodes } = useEpisodesBatch(episodeIds);

  if (isLoading) return <PageSpinner />;
  if (!character)
    return <div className="p-8 text-center text-gray-400">Character not found</div>;

  const statusVariant =
    character.status === "Alive" ? "green" : character.status === "Dead" ? "red" : "gray";

  const seasonGroups = (episodes ?? []).reduce<Record<number, typeof episodes>>(
    (acc, ep) => {
      if (!ep) return acc;
      const { season } = parseSeasonEpisode(ep.episode);
      if (!acc[season]) acc[season] = [];
      acc[season]!.push(ep);
      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        to="/characters"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-portal-teal"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Characters
      </Link>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        {/* Portrait + stats */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-portal-border">
            <img
              src={character.image}
              alt={character.name}
              className="w-full"
            />
          </div>

          <Card>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Profile
            </h2>
            <dl className="space-y-2">
              {[
                { label: "Status", value: character.status, colored: true },
                { label: "Species", value: character.species || "Unknown" },
                { label: "Type", value: character.type || "—" },
                { label: "Gender", value: character.gender },
              ].map(({ label, value, colored }) => (
                <div key={label} className="flex justify-between text-sm">
                  <dt className="text-gray-500">{label}</dt>
                  <dd
                    className={cn(
                      "font-medium",
                      colored ? statusColor(value) : "text-gray-200"
                    )}
                  >
                    {colored && (
                      <span
                        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDot(value)}`}
                      />
                    )}
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Location
            </h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Origin</p>
                  <p className="text-gray-200">{character.origin.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-portal-teal" />
                <div>
                  <p className="text-xs text-gray-500">Last known</p>
                  <p className="text-gray-200">{character.location.name}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{character.name}</h1>
              <Badge variant={statusVariant}>
                <span
                  className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDot(character.status)}`}
                />
                {character.status}
              </Badge>
            </div>
            <p className="mt-1 text-gray-400">
              {character.species} · {character.gender}
            </p>
          </div>

          {/* Episode presence bar */}
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                <Tv className="h-4 w-4 text-portal-teal" />
                Episode Appearances
              </h2>
              <span className="text-sm font-bold text-portal-teal">
                {character.episode.length} / 51
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-portal-teal to-portal-green transition-all duration-500"
                style={{ width: `${(character.episode.length / 51) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-gray-600">
              {Math.round((character.episode.length / 51) * 100)}% of all episodes
            </p>
          </Card>

          {/* Episodes by season */}
          <Card>
            <h2 className="mb-4 text-sm font-semibold text-gray-300">Episodes by Season</h2>
            {Object.keys(seasonGroups).length === 0 ? (
              <p className="text-sm text-gray-500">Loading episodes...</p>
            ) : (
              <div className="space-y-4">
                {Object.entries(seasonGroups)
                  .sort(([a], [b]) => Number(a) - Number(b))
                  .map(([season, eps]) => (
                    <div key={season}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-portal-teal">
                        Season {season}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {eps?.map((ep) => (
                          <Link
                            key={ep.id}
                            to="/episodes"
                            className="rounded border border-portal-border px-2 py-1 text-xs text-gray-400 transition-colors hover:border-portal-teal hover:text-portal-teal"
                          >
                            {ep.episode} · {ep.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Card>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <ExternalLink className="h-3 w-3" />
            <a
              href={character.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-portal-teal"
            >
              View in API
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

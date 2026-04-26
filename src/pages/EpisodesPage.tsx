import { useState } from "react";
import { useEpisodes } from "@/hooks/useEpisodes";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { PageSpinner } from "@/components/ui/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { formatAirDate } from "@/lib/utils";
import { Tv, Users } from "lucide-react";
import { Episode, parseSeasonEpisode } from "@/lib/api";

const SEASON_OPTIONS = Array.from({ length: 5 }, (_, i) => ({
  label: `Season ${i + 1}`,
  value: `S0${i + 1}`,
}));

function EpisodeCard({ episode }: { episode: Episode }) {
  const { episode: epNum } = parseSeasonEpisode(episode.episode);

  return (
    <Card hover>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge variant="teal">{episode.episode}</Badge>
            <span className="text-xs text-gray-500">{formatAirDate(episode.air_date)}</span>
          </div>
          <h3 className="truncate font-semibold text-white">{episode.name}</h3>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
            <Users className="h-3 w-3" />
            <span>{episode.characters.length} characters</span>
          </div>
        </div>
        <p className="flex-shrink-0 text-2xl font-bold text-portal-teal/30">
          E{String(epNum).padStart(2, "0")}
        </p>
      </div>
    </Card>
  );
}

export function EpisodesPage() {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [page, setPage] = useState(1);
  const debouncedName = useDebounce(name, 400);

  const { data, isLoading, isError } = useEpisodes({
    page,
    name: debouncedName || undefined,
    episode: season || undefined,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Tv className="h-7 w-7 text-portal-teal" />
        <div>
          <h1 className="text-2xl font-bold text-white">Episodes</h1>
          {data && (
            <p className="text-sm text-gray-500">{data.info.count} episodes across 5 seasons</p>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <SearchInput
          value={name}
          onChange={(v) => {
            setName(v);
            setPage(1);
          }}
          placeholder="Search episodes..."
          className="min-w-[200px] flex-1"
        />
        <Select
          value={season}
          onChange={(v) => {
            setSeason(v);
            setPage(1);
          }}
          options={SEASON_OPTIONS}
          placeholder="All seasons"
          className="min-w-[130px]"
        />
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : isError ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-red-900/50 bg-red-900/10">
          <p className="text-red-400">No episodes found.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {data?.results.map((ep) => <EpisodeCard key={ep.id} episode={ep} />)}
          </div>
          {data && (
            <div className="mt-8 flex justify-center">
              <Pagination page={page} totalPages={data.info.pages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

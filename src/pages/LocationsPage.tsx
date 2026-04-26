import { useState } from "react";
import { useLocations } from "@/hooks/useLocations";
import { SearchInput } from "@/components/ui/SearchInput";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Pagination } from "@/components/ui/Pagination";
import { PageSpinner } from "@/components/ui/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { MapPin, Users, Globe } from "lucide-react";
import { Location } from "@/lib/api";

function LocationCard({ location }: { location: Location }) {
  return (
    <Card hover>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">{location.name}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {location.type && <Badge variant="teal">{location.type}</Badge>}
            {location.dimension && location.dimension !== "unknown" && (
              <Badge variant="gray" className="max-w-[160px] truncate">
                {location.dimension}
              </Badge>
            )}
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <Users className="h-3 w-3" />
            <span>{location.residents.length} residents</span>
          </div>
        </div>
        <Globe className="h-8 w-8 flex-shrink-0 text-portal-teal/20" />
      </div>
      {location.residents.length > 0 && (
        <div className="mt-3 border-t border-portal-border pt-3">
          <div className="flex -space-x-1">
            {location.residents.slice(0, 8).map((resUrl) => {
              const resId = resUrl.split("/").pop();
              return (
                <img
                  key={resId}
                  src={`https://rickandmortyapi.com/api/character/avatar/${resId}.jpeg`}
                  alt={`Resident ${resId}`}
                  className="h-6 w-6 rounded-full border border-portal-card object-cover"
                  loading="lazy"
                />
              );
            })}
            {location.residents.length > 8 && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-portal-card bg-gray-800 text-xs text-gray-400">
                +{location.residents.length - 8}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export function LocationsPage() {
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const debouncedName = useDebounce(name, 400);

  const { data, isLoading, isError } = useLocations({
    page,
    name: debouncedName || undefined,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <MapPin className="h-7 w-7 text-portal-teal" />
        <div>
          <h1 className="text-2xl font-bold text-white">Locations</h1>
          {data && (
            <p className="text-sm text-gray-500">{data.info.count} dimensions &amp; realities</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <SearchInput
          value={name}
          onChange={(v) => {
            setName(v);
            setPage(1);
          }}
          placeholder="Search locations..."
          className="max-w-md"
        />
      </div>

      {isLoading ? (
        <PageSpinner />
      ) : isError ? (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-red-900/50 bg-red-900/10">
          <p className="text-red-400">No locations found.</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.results.map((loc) => <LocationCard key={loc.id} location={loc} />)}
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

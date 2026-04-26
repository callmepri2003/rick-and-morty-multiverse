import { useState, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterCard } from "@/components/characters/CharacterCard";
import { CharacterFiltersBar } from "@/components/characters/CharacterFiltersBar";
import { Pagination } from "@/components/ui/Pagination";
import { PageSpinner } from "@/components/ui/Spinner";
import { Users } from "lucide-react";

interface Filters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

const DEFAULT_FILTERS: Filters = { name: "", status: "", species: "", gender: "" };

export function CharactersPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const debouncedName = useDebounce(filters.name, 400);

  const { data, isLoading, isError } = useCharacters({
    page,
    name: debouncedName || undefined,
    status: filters.status || undefined,
    species: filters.species || undefined,
    gender: filters.gender || undefined,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedName, filters.status, filters.species, filters.gender]);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Users className="h-7 w-7 text-portal-teal" />
        <div>
          <h1 className="text-2xl font-bold text-white">Characters</h1>
          {data && (
            <p className="text-sm text-gray-500">{data.info.count.toLocaleString()} results</p>
          )}
        </div>
      </div>

      <CharacterFiltersBar filters={filters} onChange={handleFilterChange} />

      <div className="mt-6">
        {isLoading ? (
          <PageSpinner />
        ) : isError ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-red-900/50 bg-red-900/10">
            <p className="text-red-400">No characters found matching your filters.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {data?.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            {data && (
              <div className="mt-8 flex justify-center">
                <Pagination page={page} totalPages={data.info.pages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

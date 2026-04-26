import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { api, CharacterFilters } from "@/lib/api";

export function useCharacters(filters: CharacterFilters = {}) {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => api.characters.list(filters),
  });
}

export function useCharactersInfinite(filters: Omit<CharacterFilters, "page"> = {}) {
  return useInfiniteQuery({
    queryKey: ["characters-infinite", filters],
    queryFn: ({ pageParam }) => api.characters.list({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.info.next ? (lastPageParam as number) + 1 : undefined,
  });
}

export function useCharacter(id: number) {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => api.characters.get(id),
    enabled: id > 0,
  });
}

export function useCharactersBatch(ids: number[]) {
  return useQuery({
    queryKey: ["characters-batch", ids],
    queryFn: () => api.characters.getMany(ids),
    enabled: ids.length > 0,
  });
}

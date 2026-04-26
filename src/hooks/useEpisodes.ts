import { useQuery } from "@tanstack/react-query";
import { api, EpisodeFilters } from "@/lib/api";

export function useEpisodes(filters: EpisodeFilters = {}) {
  return useQuery({
    queryKey: ["episodes", filters],
    queryFn: () => api.episodes.list(filters),
  });
}

export function useEpisode(id: number) {
  return useQuery({
    queryKey: ["episode", id],
    queryFn: () => api.episodes.get(id),
    enabled: id > 0,
  });
}

export function useEpisodesBatch(ids: number[]) {
  return useQuery({
    queryKey: ["episodes-batch", ids],
    queryFn: () => api.episodes.getMany(ids),
    enabled: ids.length > 0,
  });
}

export function useAllEpisodes() {
  return useQuery({
    queryKey: ["all-episodes"],
    queryFn: async () => {
      const first = await api.episodes.list({ page: 1 });
      const remaining = await Promise.all(
        Array.from({ length: first.info.pages - 1 }, (_, i) =>
          api.episodes.list({ page: i + 2 })
        )
      );
      return [first, ...remaining].flatMap((r) => r.results);
    },
    staleTime: 1000 * 60 * 10,
  });
}

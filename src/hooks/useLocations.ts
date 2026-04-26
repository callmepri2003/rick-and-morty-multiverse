import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { api, LocationFilters } from "@/lib/api";

export function useLocations(filters: LocationFilters = {}) {
  return useQuery({
    queryKey: ["locations", filters],
    queryFn: () => api.locations.list(filters),
  });
}

export function useLocationsInfinite(filters: Omit<LocationFilters, "page"> = {}) {
  return useInfiniteQuery({
    queryKey: ["locations-infinite", filters],
    queryFn: ({ pageParam }) => api.locations.list({ ...filters, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.info.next ? (lastPageParam as number) + 1 : undefined,
  });
}

export function useLocation(id: number) {
  return useQuery({
    queryKey: ["location", id],
    queryFn: () => api.locations.get(id),
    enabled: id > 0,
  });
}

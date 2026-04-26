const BASE_URL = "https://rickandmortyapi.com/api";

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiResponse<T> {
  info: ApiInfo;
  results: T[];
}

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export interface EpisodeFilters {
  page?: number;
  name?: string;
  episode?: string;
}

async function fetcher<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== "" && v !== null
  );
  if (!entries.length) return "";
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
}

export const api = {
  characters: {
    list: (filters: CharacterFilters = {}) =>
      fetcher<ApiResponse<Character>>(`/character${buildQuery(filters)}`),
    get: (id: number) => fetcher<Character>(`/character/${id}`),
    getMany: (ids: number[]) =>
      ids.length === 1
        ? fetcher<Character>(`/character/${ids[0]}`).then((c) => [c])
        : fetcher<Character[]>(`/character/${ids.join(",")}`),
  },
  locations: {
    list: (filters: LocationFilters = {}) =>
      fetcher<ApiResponse<Location>>(`/location${buildQuery(filters)}`),
    get: (id: number) => fetcher<Location>(`/location/${id}`),
  },
  episodes: {
    list: (filters: EpisodeFilters = {}) =>
      fetcher<ApiResponse<Episode>>(`/episode${buildQuery(filters)}`),
    get: (id: number) => fetcher<Episode>(`/episode/${id}`),
    getMany: (ids: number[]) =>
      ids.length === 1
        ? fetcher<Episode>(`/episode/${ids[0]}`).then((e) => [e])
        : fetcher<Episode[]>(`/episode/${ids.join(",")}`),
  },
};

export function extractId(url: string): number {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 1], 10);
}

export function parseSeasonEpisode(code: string): { season: number; episode: number } {
  const match = code.match(/S(\d+)E(\d+)/i);
  if (!match) return { season: 0, episode: 0 };
  return { season: parseInt(match[1], 10), episode: parseInt(match[2], 10) };
}

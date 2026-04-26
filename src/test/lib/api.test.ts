import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { api, extractId, parseSeasonEpisode } from "@/lib/api";

describe("extractId", () => {
  it("extracts id from character URL", () => {
    expect(extractId("https://rickandmortyapi.com/api/character/42")).toBe(42);
  });

  it("extracts id from episode URL", () => {
    expect(extractId("https://rickandmortyapi.com/api/episode/1")).toBe(1);
  });
});

describe("parseSeasonEpisode", () => {
  it("parses S01E01 correctly", () => {
    expect(parseSeasonEpisode("S01E01")).toEqual({ season: 1, episode: 1 });
  });

  it("parses S03E10 correctly", () => {
    expect(parseSeasonEpisode("S03E10")).toEqual({ season: 3, episode: 10 });
  });

  it("returns zeros for invalid input", () => {
    expect(parseSeasonEpisode("invalid")).toEqual({ season: 0, episode: 0 });
  });
});

describe("api.characters.list", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches characters with no filters", async () => {
    const mockResponse = {
      info: { count: 826, pages: 42, next: null, prev: null },
      results: [],
    };
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const result = await api.characters.list();
    expect(fetch).toHaveBeenCalledWith("https://rickandmortyapi.com/api/character");
    expect(result.info.count).toBe(826);
  });

  it("includes query params when filters provided", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ info: { count: 1, pages: 1, next: null, prev: null }, results: [] }),
    } as Response);

    await api.characters.list({ name: "Rick", status: "alive", page: 2 });
    const calledUrl = vi.mocked(fetch).mock.calls[0]?.[0] as string;
    expect(calledUrl).toContain("name=Rick");
    expect(calledUrl).toContain("status=alive");
    expect(calledUrl).toContain("page=2");
    expect(calledUrl).toMatch(/^https:\/\/rickandmortyapi\.com\/api\/character\?/);
  });

  it("throws on non-ok response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    await expect(api.characters.list({ name: "XXXXXXXXXX" })).rejects.toThrow("API error: 404");
  });
});

describe("api.characters.getMany", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("uses single endpoint for one id", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, name: "Rick Sanchez" }),
    } as Response);

    await api.characters.getMany([1]);
    expect(fetch).toHaveBeenCalledWith("https://rickandmortyapi.com/api/character/1");
  });

  it("uses batch endpoint for multiple ids", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1 }, { id: 2 }],
    } as Response);

    await api.characters.getMany([1, 2]);
    expect(fetch).toHaveBeenCalledWith("https://rickandmortyapi.com/api/character/1,2");
  });
});

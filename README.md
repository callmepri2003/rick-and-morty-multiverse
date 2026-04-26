# MultiverseDB — Rick & Morty Explorer

> A production-quality single-page app built to demonstrate modern React engineering practices: typed API layer, server-state caching, data visualisation, full test coverage, and automated CI/CD.

**[Live Demo →](https://rick-and-morty-multiverse.vercel.app)**

[![CI](https://github.com/callmepri2003/rick-and-morty-multiverse/actions/workflows/ci.yml/badge.svg)](https://github.com/callmepri2003/rick-and-morty-multiverse/actions/workflows/ci.yml)

---

## What it does

| Page | Highlights |
|---|---|
| **Characters** | Real-time search, 4-way filter (status / species / gender / name), paginated grid with lazy-loaded images |
| **Character Detail** | Episode appearance bar, season-grouped episode breakdown, origin & location |
| **Episodes** | Season filter, search, cast count per episode |
| **Locations** | Search 126 dimensions with resident avatar strip |
| **Stats Dashboard** | Recharts pie + bar charts — survival rates, cast-size rankings, episodes per season |
| **Random Portal** | Animated button that jumps to a random character, episode, or location |

---

## Tech stack

| Concern | Choice | Why |
|---|---|---|
| Build | **Vite 6 + React 18 + TypeScript** | ~250 MB install vs ~600 MB for Next.js; no SSR overhead needed for a pure API consumer |
| Routing | **React Router v6** | Declarative, typed, zero magic |
| Server state | **TanStack React Query v5** | Automatic caching, background refetch, deduplication — no manual fetch logic |
| Styling | **Tailwind CSS** | Custom `portal-teal` / `portal-green` dark theme; utility classes keep styles co-located |
| Charts | **Recharts** | Composable, responsive, easy to theme |
| Unit tests | **Vitest + React Testing Library** | Fast, Jest-compatible, native ESM |
| E2E tests | **Playwright** | Cross-browser, reliable network handling |
| CI/CD | **GitHub Actions** | Lint → unit tests (parallel) → E2E (gated) → deploy |
| Hosting | **Vercel** | SPA rewrites configured so deep links survive hard refresh |

---

## Engineering highlights

**Type-safe API layer** — Every API response is typed in [`src/lib/api.ts`](src/lib/api.ts). Filter interfaces carry index signatures so they're safely assignable to `Record<string, ...>` query params without casting.

**Server-state architecture** — All data fetching lives in React Query hooks. Components never call `fetch` directly; they consume typed query results. Cache TTL is 5 minutes; stale-while-revalidate keeps the UI snappy.

**Test strategy** — Unit tests cover utilities, hooks, and reusable components. Pages and React Query hooks are excluded from unit coverage (they need a real network) and covered by Playwright E2E instead. This avoids the false confidence of mocked integration tests.

**CI gate** — Lint and unit tests run in parallel. E2E only runs if both pass, saving compute on broken builds. Coverage is enforced at ≥70% lines/functions/statements; the gate fails the PR if it drops.

**Mobile-first** — Every layout uses Tailwind's mobile-first breakpoints. The filter bar collapses to a 3-column grid on small screens; the stats KPI cards reduce to compact mode below `sm`.

---

## Test coverage

```
61 unit tests · ~77% coverage
6 Playwright E2E specs across all routes
Coverage enforced in CI: ≥70% lines / functions / statements, ≥60% branches
```

---

## Local setup

```bash
git clone https://github.com/callmepri2003/rick-and-morty-multiverse.git
cd rick-and-morty-multiverse
npm install
npm run dev           # http://localhost:5173
```

Other commands:

```bash
npm run type-check       # tsc -b --noEmit (full project-reference check)
npm run lint             # ESLint
npm run test             # Vitest unit tests
npm run test:coverage    # Unit tests + coverage report (≥70% threshold)
npm run test:e2e         # Playwright E2E (builds first, runs against preview server)
npm run build            # Production build → dist/
```

---

## Project structure

```
src/
├── components/
│   ├── ui/             # Reusable primitives — Badge, Card, Pagination, SearchInput, Select, Spinner
│   ├── characters/     # CharacterCard, CharacterFiltersBar
│   ├── layout/         # Navbar, Footer
│   └── RandomPortal.tsx
├── hooks/              # React Query hooks — useCharacters, useEpisodes, useLocations, useRandomPortal
├── lib/
│   ├── api.ts          # Typed API client + all fetch functions
│   └── utils.ts        # cn(), status helpers, date formatting
├── pages/              # One file per route
└── test/               # Unit tests mirror src/ structure + shared fixtures
e2e/                    # Playwright specs — one per major route
.github/workflows/      # ci.yml — lint + unit + E2E pipeline
```

---

## CI pipeline

```
push / PR
  ├── Lint & Type Check   (eslint + tsc -b --noEmit)  ┐ run in parallel
  └── Unit Tests          (vitest --coverage ≥70%)    ┘
              ↓ both pass
         E2E Tests        (playwright, retries: 2)
              ↓ passes
         All Checks Pass  (merge gate)
```

---

## Data source

[Rick and Morty API](https://rickandmortyapi.com) — free, public, no auth required. All character, episode, and location data belongs to Adult Swim / Rick and Morty.

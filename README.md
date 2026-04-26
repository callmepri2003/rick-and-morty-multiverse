# MultiverseDB — Rick & Morty Explorer

> An interactive, portal-themed database for exploring the Rick & Morty universe.

[![CI](https://github.com/callmepri2003/rick-and-morty-multiverse/actions/workflows/ci.yml/badge.svg)](https://github.com/callmepri2003/rick-and-morty-multiverse/actions/workflows/ci.yml)

## Features

- **Character Explorer** — Browse all 826 characters with real-time search, multi-filter (status, species, gender), paginated grid
- **Character Detail Pages** — Full profile with episode appearance tracker, season breakdown, and location history
- **Episode Guide** — Season-grouped episode browser with cast counts
- **Locations / Dimensions** — Explore 126 unique dimensions with resident avatar previews
- **Statistics Dashboard** — Recharts-powered analytics: survival rates, cast-size rankings, episodes per season

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS with custom portal theme |
| Data Fetching | TanStack React Query v5 |
| Charts | Recharts |
| Unit Tests | Vitest + React Testing Library |
| E2E Tests | Playwright |
| CI/CD | GitHub Actions |
| API | [Rick & Morty API](https://rickandmortyapi.com) |

## Getting Started

```bash
npm install
npm run dev         # Development server at localhost:3000
npm test            # Unit tests
npm run test:coverage  # Unit tests + coverage report (≥70% threshold)
npm run test:e2e    # Playwright E2E tests
npm run type-check  # TypeScript check
npm run lint        # ESLint
```

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Hero / home
│   ├── characters/     # Character list + detail
│   ├── episodes/       # Episode guide
│   ├── locations/      # Locations explorer
│   └── stats/          # Analytics dashboard
├── components/
│   ├── ui/             # Reusable primitives (Badge, Card, Pagination, ...)
│   ├── characters/     # Character-specific components
│   └── layout/         # Navbar, Footer
├── hooks/              # React Query hooks
├── lib/                # API client + utilities
└── test/               # Unit test suites + fixtures
e2e/                    # Playwright E2E specs
.github/workflows/      # CI/CD pipeline
```

## CI/CD

Every PR runs three parallel jobs via GitHub Actions:
1. **Lint & Type Check** — ESLint + `tsc --noEmit`
2. **Unit Tests** — Vitest with ≥70% coverage threshold (lines/functions/statements)
3. **E2E Tests** — Playwright against a production build (runs after unit tests pass)

PRs are only merged when all checks are green.

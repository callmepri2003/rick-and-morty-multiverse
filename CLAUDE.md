# AI Development Playbook

Reference document for Claude Code. Import this into new projects. These are hard-won lessons from production sessions, not theory.

---

## Stack Decision Tree

### Client-side app (API consumer, no SSR needed)
```
Vite + React + TypeScript
├── Routing: react-router-dom v6
├── Data fetching: @tanstack/react-query v5
├── Styling: Tailwind CSS
├── Charts: recharts
└── Icons: lucide-react
```

### When to use Next.js
Only when you genuinely need: SSR, SSG, API routes, or image optimisation at scale. A public REST API explorer, dashboard, or portfolio piece does NOT need Next.js. Vite is ~60% smaller node_modules and zero framework magic to explain.

---

## Project Bootstrap (exact order)

```bash
# 1. Scaffold
npm create vite@latest . -- --template react-ts

# 2. Install all deps in one shot
npm install react-router-dom @tanstack/react-query @tanstack/react-query-devtools recharts clsx tailwind-merge lucide-react
npm install -D tailwindcss postcss autoprefixer @types/node vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @playwright/test prettier prettier-plugin-tailwindcss eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint @eslint/js globals

# 3. Init Tailwind
npx tailwindcss init -p
```

---

## Non-Negotiables (ship without these = CI will break)

### 1. Always create `src/vite-env.d.ts`
```ts
/// <reference types="vite/client" />
```
Without this, `import './index.css'` in `main.tsx` causes `TS2307: Cannot find module` during `tsc -b`.

### 2. Use `tsc -b --noEmit` not `tsc --noEmit`
```json
// package.json scripts
"type-check": "tsc -b --noEmit",
"build": "tsc -b && vite build"
```
`tsc --noEmit` on a project-references setup (separate `tsconfig.app.json` + `tsconfig.node.json`) silently checks nothing. `tsc -b` respects the full reference graph and catches real errors.

### 3. Add `@types/node` to devDependencies
```json
"@types/node": "^22.0.0"
```
And reference it in `tsconfig.node.json`:
```json
"types": ["node"]
```
Required for `vite.config.ts` (`path`, `__dirname`) and `playwright.config.ts` (`process.env`).

### 4. Use `mergeConfig` in vitest.config.ts
```ts
// ❌ This causes plugin type conflicts (vitest bundles its own vite)
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
export default defineConfig({ plugins: [react()], test: { ... } });

// ✅ This works cleanly
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
export default mergeConfig(viteConfig, defineConfig({ test: { ... } }));
```
The conflict: vitest bundles its own version of vite internally. Importing `@vitejs/plugin-react` types against the top-level vite produces irreconcilable plugin type mismatches at compile time.

### 5. Use `window.ResizeObserver` not `global.ResizeObserver` in test setup
```ts
// src/test/setup.ts
// ❌ global is a Node.js thing — not in browser tsconfig lib
global.ResizeObserver = class ResizeObserver { ... };

// ✅ window is in DOM lib
window.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
```

### 6. Add index signatures to filter interfaces
```ts
// ❌ TypeScript won't let you pass this to Record<string, unknown>
interface CharacterFilters {
  page?: number;
  name?: string;
}

// ✅ Explicitly declare the index signature
interface CharacterFilters {
  [key: string]: string | number | undefined;
  page?: number;
  name?: string;
}
```

### 7. No literal `false &&` in tests
```ts
// ❌ ESLint no-constant-binary-expression fires in CI
expect(cn("base", false && "hidden")).toBe("base");

// ✅ Use a variable
const condition = false;
expect(cn("base", condition && "hidden")).toBe("base");
```

---

## TypeScript Config (exact working setup)

**`tsconfig.json`** — root, just orchestrates references
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

**`tsconfig.app.json`** — browser code
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

**`tsconfig.node.json`** — config files (vite, vitest, playwright)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts", "vitest.config.ts", "playwright.config.ts"]
}
```

---

## Vitest Coverage Configuration

```ts
// vitest.config.ts
coverage: {
  provider: "v8",
  thresholds: { lines: 70, functions: 70, branches: 60, statements: 70 },
  exclude: [
    "node_modules/**",
    "e2e/**",            // ← critical: exclude Playwright specs
    "src/test/**",
    "**/*.d.ts",
    "**/*.config.*",
    "src/main.tsx",
    "src/App.tsx",
    "src/pages/**",      // ← pages are integration-level; covered by E2E
    "src/hooks/use*.ts", // ← React Query hooks need real network; exclude
    "src/components/layout/**", // ← use react-router; tricky to unit test
    "dist/**",
  ],
}
```

**Why exclude pages and hooks from unit test coverage:** Pages and React Query hooks only make sense in an integration context (real browser + real API). Trying to unit test them requires extensive mocking that provides false confidence. Cover them with Playwright E2E instead.

---

## Playwright E2E Non-Negotiables

### Always use `.first()` on text locators
```ts
// ❌ Fails with "strict mode violation" when text appears in navbar AND page
await expect(page.getByText("Locations")).toBeVisible();

// ✅ Disambiguate
await expect(page.getByText("Locations").first()).toBeVisible();
// OR use more specific text unique to the page
await expect(page.getByText("Dimensions & places")).toBeVisible();
```

**Why it happens:** Navigation links and page headings share words. `getByText` is strict by default — it fails if there are multiple matches.

### Use ≥25s timeouts for network-dependent content
```ts
// ❌ 15s isn't enough when CI runner makes cold API call
await page.waitForSelector('[data-testid="character-card"]', { timeout: 15000 });

// ✅
await page.waitForSelector('[data-testid="character-card"]', { timeout: 25000 });
```

### Use `getByRole` when text is ambiguous
```ts
// ❌ Matches both <h1> and <span> in navbar
page.getByText("MultiverseDB")

// ✅
page.getByRole("heading", { name: /MultiverseDB/i }).first()
```

### Playwright config for Vite (preview server, not Next.js)
```ts
// playwright.config.ts
use: { baseURL: "http://localhost:4173" },
webServer: {
  command: "npm run build && npm run preview",
  url: "http://localhost:4173",
  timeout: 120000,
}
```
Note: `vite preview` runs on **4173**, not 3000.

---

## GitHub Actions CI Pipeline (exact working config)

```yaml
jobs:
  lint-and-typecheck:   # always runs
  unit-tests:           # always runs, parallel with lint
  e2e-tests:            # needs: [lint-and-typecheck, unit-tests]
  all-checks-pass:      # needs all three, gates the merge
```

Key points:
- Run lint and unit tests **in parallel** — they're independent
- Gate E2E on both passing — don't waste Playwright time if types or tests are broken
- Use `concurrency` with `cancel-in-progress: true` to kill stale runs on force-push
- Set `retries: 2` in playwright config for CI — network flakiness is real

---

## Git Workflow

```bash
# Never commit directly to main
git checkout -b feat/your-feature

# Commit discipline: one logical change per commit
git commit -m "feat: add X"
git commit -m "fix: resolve Y"
git commit -m "test: cover Z"

# Open PR → CI must be green → merge → delete branch
gh pr create --title "feat: X" --body "..."
gh pr merge N --squash --delete-branch
```

**PR body template:**
```markdown
## Summary
- What this adds/changes (bullets)

## Test plan
- [x] Unit tests: X passing
- [ ] E2E: manually verify Y
- [ ] Check Z edge case
```

---

## What Didn't Work (avoid these)

| Mistake | Why it breaks | Fix |
|---|---|---|
| `tsc --noEmit` (no `-b`) | Silently skips project references | `tsc -b --noEmit` |
| `import react from "@vitejs/plugin-react"` in `vitest.config.ts` directly | Plugin type conflict with vitest's bundled vite | `mergeConfig` pattern |
| `global.ResizeObserver` in test setup | `global` not in DOM tsconfig lib | `window.ResizeObserver` |
| `false && "string"` in tests | ESLint `no-constant-binary-expression` | Use a boolean variable |
| Interfaces without index signatures passed to `Record<string, ...>` | TypeScript strict mode rejects it | Add `[key: string]: T` index signature |
| `getByText("word")` without `.first()` | Strict mode violation if word appears twice | Always `.first()` or use unique text |
| `timeout: 15000` for API-backed E2E | Cold API calls in CI take 20–30s | Use 25000+ |
| Next.js for a client-side API explorer | 500MB+ node_modules, SSR overhead, `use()` hook complexity | Vite + React Router |
| Committing `node_modules` or big binaries before checking disk space | `ENOSPC` kills everything mid-session | Check `df -h /` before starting |

---

## ESLint Config (flat config, ESLint 9)

```js
// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage", "playwright-report"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: { ecmaVersion: 2020, globals: globals.browser },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  }
);
```

---

## Tailwind Dark Theme Scaffold

```ts
// tailwind.config.ts — extend with custom tokens
colors: {
  portal: {
    green: "#39ff14",
    teal: "#00b5cc",
    dark: "#0a0a0a",
    card: "#111827",
    border: "#1f2937",
  },
},
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body { background-color: #0a0a0a; color: #f3f4f6; }
```

---

## Disk Space Check (do this first on any machine)

```bash
df -h /          # must have ≥2GB free before npm install
du -sh ~/Documents/Projects/*/node_modules 2>/dev/null | sort -rh | head -10
npm cache clean --force   # frees ~500MB
```

`npm install` for a Vite + React project needs ~250–350MB. Next.js needs ~500–700MB. If `ENOSPC` appears, all writes fail silently — you won't know until things break in weird ways.

---

## Checklist Before Opening a PR

- [ ] `npm run type-check` exits 0
- [ ] `npm run lint` exits 0
- [ ] `npm run test:coverage` exits 0 (all thresholds met)
- [ ] `npm run build` exits 0 (no TS errors, no missing modules)
- [ ] E2E tests use `.first()` on all text/role locators
- [ ] No `global.X` in test setup (use `window.X`)
- [ ] No `false &&` literals in test assertions
- [ ] All interfaces that flow into `Record<string, ...>` have an index signature

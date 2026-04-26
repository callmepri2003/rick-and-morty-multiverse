import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["node_modules/**", "e2e/**"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 60,
        statements: 70,
      },
      exclude: [
        "node_modules/**",
        "e2e/**",
        "src/test/**",
        "**/*.d.ts",
        "**/*.config.*",
        "src/main.tsx",
        "src/App.tsx",
        "src/pages/**",
        "src/hooks/useCharacters.ts",
        "src/hooks/useEpisodes.ts",
        "src/hooks/useLocations.ts",
        "src/components/layout/**",
        "src/components/characters/CharacterCard.tsx",
        "dist/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

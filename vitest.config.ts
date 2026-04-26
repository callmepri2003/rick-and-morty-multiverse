import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./src/test/setup.ts"],
      exclude: ["node_modules/**", "e2e/**"],
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
  })
);

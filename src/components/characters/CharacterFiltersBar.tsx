"use client";

import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";

interface Filters {
  name: string;
  status: string;
  species: string;
  gender: string;
}

interface CharacterFiltersBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const STATUS_OPTIONS = [
  { label: "Alive", value: "alive" },
  { label: "Dead", value: "dead" },
  { label: "Unknown", value: "unknown" },
];

const GENDER_OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Genderless", value: "genderless" },
  { label: "Unknown", value: "unknown" },
];

const SPECIES_OPTIONS = [
  { label: "Human", value: "human" },
  { label: "Alien", value: "alien" },
  { label: "Humanoid", value: "humanoid" },
  { label: "Poopybutthole", value: "poopybutthole" },
  { label: "Mythological Creature", value: "mythological creature" },
  { label: "Animal", value: "animal" },
  { label: "Robot", value: "robot" },
  { label: "Cronenberg", value: "cronenberg" },
  { label: "Disease", value: "disease" },
];

export function CharacterFiltersBar({ filters, onChange }: CharacterFiltersBarProps) {
  const set = (key: keyof Filters) => (value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap gap-3" data-testid="character-filters">
      <SearchInput
        value={filters.name}
        onChange={set("name")}
        placeholder="Search characters..."
        className="min-w-[200px] flex-1"
      />
      <Select
        value={filters.status}
        onChange={set("status")}
        options={STATUS_OPTIONS}
        placeholder="All statuses"
        className="min-w-[140px]"
      />
      <Select
        value={filters.species}
        onChange={set("species")}
        options={SPECIES_OPTIONS}
        placeholder="All species"
        className="min-w-[140px]"
      />
      <Select
        value={filters.gender}
        onChange={set("gender")}
        options={GENDER_OPTIONS}
        placeholder="All genders"
        className="min-w-[130px]"
      />
    </div>
  );
}

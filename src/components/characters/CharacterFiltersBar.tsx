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
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-testid="character-filters">
      <SearchInput
        value={filters.name}
        onChange={set("name")}
        placeholder="Search characters..."
        className="w-full sm:min-w-[200px] sm:flex-1"
      />
      <div className="grid grid-cols-3 gap-3 sm:contents">
        <Select
          value={filters.status}
          onChange={set("status")}
          options={STATUS_OPTIONS}
          placeholder="Status"
          className="sm:min-w-[140px]"
        />
        <Select
          value={filters.species}
          onChange={set("species")}
          options={SPECIES_OPTIONS}
          placeholder="Species"
          className="sm:min-w-[140px]"
        />
        <Select
          value={filters.gender}
          onChange={set("gender")}
          options={GENDER_OPTIONS}
          placeholder="Gender"
          className="sm:min-w-[130px]"
        />
      </div>
    </div>
  );
}

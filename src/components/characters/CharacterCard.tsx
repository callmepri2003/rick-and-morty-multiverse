import { Link } from "react-router-dom";
import { Character } from "@/lib/api";
import { statusDot } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const statusVariant =
    character.status === "Alive" ? "green" : character.status === "Dead" ? "red" : "gray";

  return (
    <Link
      to={`/characters/${character.id}`}
      className="group block overflow-hidden rounded-xl border border-portal-border bg-portal-card transition-all duration-200 hover:border-portal-teal/50 hover:shadow-lg hover:shadow-portal-teal/10"
      data-testid="character-card"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-portal-card/90 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2">
          <Badge variant={statusVariant}>
            <span
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${statusDot(character.status)}`}
            />
            {character.status}
          </Badge>
        </div>
      </div>
      <div className="p-3">
        <h3 className="truncate font-semibold text-white transition-colors group-hover:text-portal-teal">
          {character.name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-400">
          {character.species}
          {character.type ? ` · ${character.type}` : ""}
        </p>
        <p className="mt-1 truncate text-xs text-gray-500">{character.location.name}</p>
        <p className="mt-1 text-xs text-gray-600">{character.episode.length} episodes</p>
      </div>
    </Link>
  );
}

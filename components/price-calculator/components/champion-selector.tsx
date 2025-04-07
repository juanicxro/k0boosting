import React from "react";
import { User } from "lucide-react";
import { CHAMPIONS } from "../data";

interface ChampionSelectorProps {
  selectedChampions: string[];
  onChampionToggle: (champion: string) => void;
}

export function ChampionSelector({
  selectedChampions,
  onChampionToggle,
}: ChampionSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium flex items-center gap-2">
        <User className="h-4 w-4" /> Choose Champions
        {selectedChampions.length > 0 && (
          <span className="text-xs text-muted-foreground ml-1">
            {selectedChampions.length}/5
          </span>
        )}
      </label>
      <div className="grid grid-cols-4 gap-1 mt-1 max-h-24 overflow-y-auto">
        {CHAMPIONS.map((champion) => (
          <div
            key={champion}
            className={`p-1 border rounded cursor-pointer text-xs text-center ${
              selectedChampions.includes(champion)
                ? "bg-primary/20 border-primary"
                : selectedChampions.length >= 5
                ? "border-input bg-muted/30 text-muted-foreground"
                : "border-input hover:bg-muted/50"
            }`}
            onClick={() => onChampionToggle(champion)}
          >
            {champion}
          </div>
        ))}
      </div>
    </div>
  );
}

interface ChampionSelectorProps {
  champions: string[];
  selectedChampions: string[];
  onToggle: (champion: string) => void;
  maxSelections?: number;
}

export function ChampionSelector({
  champions,
  selectedChampions,
  onToggle,
  maxSelections = 2,
}: ChampionSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Preferred Champions
        {selectedChampions.length > 0 && (
          <span className="text-xs text-muted-foreground ml-2">
            ({selectedChampions.length}/{maxSelections})
          </span>
        )}
      </label>
      <div className="grid grid-cols-3 gap-1 max-h-28 overflow-y-auto">
        {champions.map((champion) => (
          <div
            key={champion}
            className={`p-1.5 border rounded cursor-pointer text-xs text-center ${
              selectedChampions.includes(champion)
                ? "bg-primary/20 border-primary"
                : selectedChampions.length >= maxSelections
                ? "border-input bg-muted/30 text-muted-foreground"
                : "border-input hover:bg-muted/50"
            }`}
            onClick={() => onToggle(champion)}
          >
            {champion}
          </div>
        ))}
      </div>
    </div>
  );
}

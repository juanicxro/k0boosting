interface OrderSummaryProps {
  currentRank: string;
  desiredRank: string;
  selectedChampions: string[];
}

export function OrderSummary({
  currentRank,
  desiredRank,
  selectedChampions,
}: OrderSummaryProps) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border mb-8">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Current Rank:</span>
          <span className="font-medium">{currentRank || "Not selected"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Desired Rank:</span>
          <span className="font-medium">{desiredRank || "Not selected"}</span>
        </div>

        {selectedChampions.length > 0 && (
          <div>
            <span className="text-muted-foreground">Preferred Champions:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedChampions.map((champion) => (
                <span
                  key={champion}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {champion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

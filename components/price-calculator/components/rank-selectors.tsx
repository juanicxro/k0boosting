import React from "react";
import { Award, Target } from "lucide-react";
import { RANKS_WITH_DIVISIONS } from "../data";

interface RankSelectorsProps {
  currentRank: string;
  desiredRank: string;
  onCurrentRankChange: (value: string) => void;
  onDesiredRankChange: (value: string) => void;
  onInputChange: () => void;
}

export function RankSelectors({
  currentRank,
  desiredRank,
  onCurrentRankChange,
  onDesiredRankChange,
  onInputChange,
}: RankSelectorsProps) {
  // Função para determinar se um rank deve estar disponível para seleção
  const isRankAvailableForDesired = (rank: string): boolean => {
    if (!currentRank) return true;

    const rankIndex = RANKS_WITH_DIVISIONS.indexOf(rank);
    const currentRankIndex = RANKS_WITH_DIVISIONS.indexOf(currentRank);

    // O rank desejado deve ser maior (índice maior significa rank superior)
    return rankIndex > currentRankIndex;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Current Rank */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Award className="h-4 w-4" /> Current Rank
        </label>
        <select
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={currentRank}
          onChange={(e) => {
            onCurrentRankChange(e.target.value);
            // Se o rank desejado atual não for compatível com o novo rank atual, limpe-o
            if (desiredRank && !isRankAvailableForDesired(desiredRank)) {
              onDesiredRankChange("");
            }
            onInputChange();
          }}
        >
          <option value="">Select current</option>
          {RANKS_WITH_DIVISIONS.slice(0, -5).map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      {/* Desired Rank */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-2">
          <Target className="h-4 w-4" /> Desired Rank
        </label>
        <select
          className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={desiredRank}
          onChange={(e) => {
            onDesiredRankChange(e.target.value);
            onInputChange();
          }}
          disabled={!currentRank}
        >
          <option value="">Select desired</option>
          {RANKS_WITH_DIVISIONS.filter(isRankAvailableForDesired).map(
            (rank) => (
              <option key={rank} value={rank}>
                {rank}
              </option>
            )
          )}
        </select>
      </div>
    </div>
  );
}

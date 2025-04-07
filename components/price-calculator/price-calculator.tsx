"use client";
import React from "react";
import { usePriceCalculator } from "./hooks/usePriceCalculator";
import { RegionSelector } from "./components/region-selector";
import { BoostModeSelector } from "./components/boost-mode-selector";
import { RankSelectors } from "./components/rank-selectors";
import { ChampionSelector } from "./components/champion-selector";
import { AddonSelector } from "./components/addon-selector";
import { ErrorDisplay } from "./components/error-display";

export function PriceCalculator() {
  const {
    region,
    setRegion,
    boostMode,
    setBoostMode,
    currentRank,
    setCurrentRank,
    desiredRank,
    setDesiredRank,
    selectedChampions,
    handleChampionToggle,
    selectedAddons,
    handleAddonToggle,
    handleInputChange,
    error,
  } = usePriceCalculator();

  return (
    <div className="w-full">
      <div className="bg-card/95 backdrop-blur-sm border border-border p-5 rounded-xl shadow-xl">
        <h3 className="text-xl font-bold mb-4">Customize Your Boost</h3>

        <div className="space-y-4">
          <ErrorDisplay message={error} />

          <RegionSelector
            value={region}
            onChange={setRegion}
            onInputChange={handleInputChange}
          />

          <BoostModeSelector
            value={boostMode}
            onChange={setBoostMode}
            onInputChange={handleInputChange}
          />

          <RankSelectors
            currentRank={currentRank}
            desiredRank={desiredRank}
            onCurrentRankChange={setCurrentRank}
            onDesiredRankChange={setDesiredRank}
            onInputChange={handleInputChange}
          />

          <ChampionSelector
            selectedChampions={selectedChampions}
            onChampionToggle={handleChampionToggle}
          />

          <AddonSelector
            selectedAddons={selectedAddons}
            onAddonToggle={handleAddonToggle}
          />
        </div>
      </div>
    </div>
  );
}

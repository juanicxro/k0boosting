"use client";
import React from "react";
import { usePocketCalculator } from "./use-pocket-calculator";
import { RankSelector } from "./rank-selector";
import { ChampionSelector } from "./champion-selector";
import { RANKS, CHAMPIONS } from "./data";
import { ActionButton } from "../ui/action-button";

export function PocketCalculator() {
  const {
    currentRank,
    desiredRank,
    selectedChampions,
    setCurrentRank,
    setDesiredRank,
    handleChampionToggle,
    handleSubmit,
  } = usePocketCalculator();

  return (
    <div className="w-full md:w-5/12">
      <div className="bg-card/95 backdrop-blur-sm border border-border p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Quick Boost Calculator</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RankSelector
            label="Current Rank"
            value={currentRank}
            options={RANKS.slice(0, -1)}
            onChange={setCurrentRank}
            required
          />

          <RankSelector
            label="Desired Rank"
            value={desiredRank}
            options={RANKS.slice(1)}
            onChange={setDesiredRank}
            required
          />

          <ChampionSelector
            champions={CHAMPIONS.slice(0, 9)}
            selectedChampions={selectedChampions}
            onToggle={handleChampionToggle}
            maxSelections={2}
          />

          <ActionButton type="submit" fullWidth>
            Get Boosted
          </ActionButton>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useOrderStore } from "@/app/store/useOrderStore";

export interface UsePriceCalculatorReturn {
  region: string;
  setRegion: (region: string) => void;
  boostMode: string;
  setBoostMode: (mode: string) => void;
  currentRank: string;
  setCurrentRank: (rank: string) => void;
  desiredRank: string;
  setDesiredRank: (rank: string) => void;
  selectedChampions: string[];
  handleChampionToggle: (champion: string) => void;
  selectedAddons: string[];
  handleAddonToggle: (addonId: string) => void;
  handleInputChange: () => void;
  showPrice: boolean;
  setShowPrice: (show: boolean) => void;
  price: null;
  error: string;
}

export function usePriceCalculator(): UsePriceCalculatorReturn {
  // Obter o estado e as ações do Zustand store
  const {
    region: globalRegion,
    boostMode: globalBoostMode,
    currentRank: globalCurrentRank,
    desiredRank: globalDesiredRank,
    selectedChampions: globalChampions,
    addons: globalAddons,
    setRegion: updateGlobalRegion,
    setBoostMode: updateGlobalBoostMode,
    setCurrentRank: updateGlobalCurrentRank,
    setDesiredRank: updateGlobalDesiredRank,
    setSelectedChampions: updateGlobalChampions,
    setAddons: updateGlobalAddons,
  } = useOrderStore();

  // Estado local da calculadora
  const [region, setRegionLocal] = useState(globalRegion || "");
  const [boostMode, setBoostModeLocal] = useState(globalBoostMode || "");
  const [currentRank, setCurrentRankLocal] = useState(globalCurrentRank || "");
  const [desiredRank, setDesiredRankLocal] = useState(globalDesiredRank || "");
  const [selectedChampions, setSelectedChampionsLocal] = useState<string[]>(globalChampions || []);
  const [selectedAddons, setSelectedAddonsLocal] = useState<string[]>(globalAddons || []);
  const [showPrice, setShowPrice] = useState(false);
  const [error, setError] = useState("");

  // Atualiza o estado local quando o estado global muda
  useEffect(() => {
    setRegionLocal(globalRegion || "");
    setBoostModeLocal(globalBoostMode || "");
    setCurrentRankLocal(globalCurrentRank || "");
    setDesiredRankLocal(globalDesiredRank || "");
    setSelectedChampionsLocal(globalChampions || []);
    setSelectedAddonsLocal(globalAddons || []);
  }, [
    globalRegion,
    globalBoostMode,
    globalCurrentRank,
    globalDesiredRank,
    globalChampions,
    globalAddons,
  ]);

  // Funções que atualizam tanto o estado local quanto o global
  const setRegion = (value: string) => {
    setRegionLocal(value);
    updateGlobalRegion(value);
  };

  const setBoostMode = (value: string) => {
    setBoostModeLocal(value);
    updateGlobalBoostMode(value);
  };

  const setCurrentRank = (value: string) => {
    setCurrentRankLocal(value);
    updateGlobalCurrentRank(value);
  };

  const setDesiredRank = (value: string) => {
    setDesiredRankLocal(value);
    updateGlobalDesiredRank(value);
  };

  const handleChampionToggle = (champion: string) => {
    const newSelectedChampions = selectedChampions.includes(champion)
      ? selectedChampions.filter((c) => c !== champion)
      : [...selectedChampions, champion].slice(0, 5); // Limita para 5 campeões

    setSelectedChampionsLocal(newSelectedChampions);
    updateGlobalChampions(newSelectedChampions);
  };

  const handleAddonToggle = (addonId: string) => {
    const newSelectedAddons = selectedAddons.includes(addonId)
      ? selectedAddons.filter((id) => id !== addonId)
      : [...selectedAddons, addonId];

    setSelectedAddonsLocal(newSelectedAddons);
    updateGlobalAddons(newSelectedAddons);
  };

  const handleInputChange = () => {
    setError("");
  };

  return {
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
    price: null,
    showPrice,
    setShowPrice,
    error,
  };
} 
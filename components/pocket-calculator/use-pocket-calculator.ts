"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useOrderStore } from "@/app/store/useOrderStore";

export function usePocketCalculator() {
  const router = useRouter();
  const {
    currentRank,
    desiredRank,
    selectedChampions,
    setCurrentRank,
    setDesiredRank,
    addChampion,
    removeChampion,
  } = useOrderStore();

  const handleChampionToggle = (champion: string) => {
    if (selectedChampions.includes(champion)) {
      removeChampion(champion);
    } else {
      addChampion(champion);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push("/2xko/order");
  };

  const isFormValid = () => {
    return currentRank !== "" && desiredRank !== "";
  };

  return {
    currentRank,
    desiredRank,
    selectedChampions,
    setCurrentRank,
    setDesiredRank,
    handleChampionToggle,
    handleSubmit,
    isFormValid,
  };
} 
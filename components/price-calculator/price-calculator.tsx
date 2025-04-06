"use client";
import React, { useState } from "react";
import { calculatePrice } from "./pricing-data";

const regions = [
  "North America (NA)",
  "South America (SA)",
  "Europe (EU)",
  "Asia",
];
const ranks = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"];
const champions = [
  "Ahri",
  "Ashe",
  "Darius",
  "Ezreal",
  "Jhin",
  "Jinx",
  "Kaisa",
  "Lux",
  "Master Yi",
  "Yasuo",
  "Zed",
];
const addons = [
  {
    id: "offline",
    name: "Play Offline",
    description: "Appear offline to your friends while boosting",
    price: 10,
  },
  {
    id: "livestream",
    name: "Livestream",
    description: "Watch your booster play on a private stream",
    price: 15,
  },
  {
    id: "priority",
    name: "Priority Boost",
    description: "Your order will be completed faster",
    price: 20,
  },
  {
    id: "coaching",
    name: "Coaching Session",
    description: "1-hour coaching session with your booster",
    price: 30,
  },
];

export function PriceCalculator() {
  const [region, setRegion] = useState("");
  const [boostMode, setBoostMode] = useState("");
  const [currentRank, setCurrentRank] = useState("");
  const [desiredRank, setDesiredRank] = useState("");
  const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [price, setPrice] = useState<{
    basePrice: number;
    addonsPrice: number;
    totalPrice: number;
  } | null>(null);
  const [showPrice, setShowPrice] = useState(false);
  const [error, setError] = useState("");

  const handleChampionToggle = (champion: string) => {
    setSelectedChampions(
      (prev) =>
        prev.includes(champion)
          ? prev.filter((c) => c !== champion)
          : [...prev, champion].slice(0, 5) // Limita para 5 campeões
    );
    // Reseta exibição de preço quando as opções mudam
    setShowPrice(false);
  };

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
    // Reseta exibição de preço quando as opções mudam
    setShowPrice(false);
  };

  const handleCalculatePrice = () => {
    setError("");

    if (!region) {
      setError("Please select your region");
      return;
    }

    if (!boostMode) {
      setError("Please select a boost mode");
      return;
    }

    if (!currentRank) {
      setError("Please select your current rank");
      return;
    }

    if (!desiredRank) {
      setError("Please select your desired rank");
      return;
    }

    const calculatedPrice = calculatePrice(
      region,
      boostMode,
      currentRank,
      desiredRank,
      selectedChampions,
      selectedAddons
    );

    if (!calculatedPrice) {
      setError(
        "Invalid rank selection. Desired rank must be higher than current rank."
      );
      return;
    }

    setPrice(calculatedPrice);
    setShowPrice(true);
  };

  const handleInputChange = () => {
    // Esconde o preço quando qualquer opção é alterada
    setShowPrice(false);
    setError("");
  };

  return (
    <div className="md:w-1/2 w-full">
      <div className="bg-card/95 backdrop-blur-sm border border-border p-8 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6">Check Your Price</h3>

        {showPrice && price ? (
          <div className="mb-6 bg-primary/10 p-4 rounded-md border border-primary/20">
            <h4 className="font-semibold text-lg mb-2">Estimated Price</h4>
            <div className="flex justify-between items-center mb-1">
              <span>Base Price:</span>
              <span className="font-medium">${price.basePrice}</span>
            </div>
            {price.addonsPrice > 0 && (
              <div className="flex justify-between items-center mb-1">
                <span>Add-ons:</span>
                <span className="font-medium">+${price.addonsPrice}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t mt-2 text-lg font-bold">
              <span>Total:</span>
              <span className="text-primary">${price.totalPrice}</span>
            </div>

            <button
              className="w-full mt-4 bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-colors"
              onClick={() => setShowPrice(false)}
            >
              Edit Options
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Region Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <select
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  handleInputChange();
                }}
              >
                <option value="">Select your region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Boost Mode Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Boost Mode</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className={`p-3 border rounded-md flex items-center justify-center ${
                    boostMode === "self-piloted"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setBoostMode("self-piloted");
                    handleInputChange();
                  }}
                >
                  Self-Piloted
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded-md flex items-center justify-center ${
                    boostMode === "duo"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-input hover:bg-muted/50"
                  }`}
                  onClick={() => {
                    setBoostMode("duo");
                    handleInputChange();
                  }}
                >
                  Duo Boost
                </button>
              </div>
            </div>

            {/* Current Rank */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Rank</label>
              <select
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={currentRank}
                onChange={(e) => {
                  setCurrentRank(e.target.value);
                  handleInputChange();
                }}
              >
                <option value="">Select current rank</option>
                {ranks.slice(0, -1).map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Desired Rank */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Desired Rank</label>
              <select
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={desiredRank}
                onChange={(e) => {
                  setDesiredRank(e.target.value);
                  handleInputChange();
                }}
              >
                <option value="">Select desired rank</option>
                {ranks.slice(1).map((rank) => (
                  <option key={rank} value={rank}>
                    {rank}
                  </option>
                ))}
              </select>
            </div>

            {/* Champion Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Choose Champions (Optional)
                {selectedChampions.length > 0 && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {selectedChampions.length}/5 selected
                  </span>
                )}
              </label>
              <p className="text-xs text-muted-foreground">
                Our booster will primarily use these champions
              </p>
              <div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
                {champions.map((champion) => (
                  <div
                    key={champion}
                    className={`p-2 border rounded cursor-pointer text-sm text-center ${
                      selectedChampions.includes(champion)
                        ? "bg-primary/20 border-primary"
                        : selectedChampions.length >= 5
                        ? "border-input bg-muted/30 text-muted-foreground"
                        : "border-input hover:bg-muted/50"
                    }`}
                    onClick={() => handleChampionToggle(champion)}
                  >
                    {champion}
                  </div>
                ))}
              </div>
            </div>

            {/* Addons */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Options</label>
              <div className="space-y-2 mt-2">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`p-3 border rounded-md cursor-pointer ${
                      selectedAddons.includes(addon.id)
                        ? "bg-primary/10 border-primary"
                        : "border-input hover:bg-muted/50"
                    }`}
                    onClick={() => handleAddonToggle(addon.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{addon.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {addon.description}
                        </div>
                      </div>
                      <div className="text-primary font-medium">
                        +${addon.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
                onClick={handleCalculatePrice}
              >
                Calculate Price
              </button>
              <p className="text-center text-muted-foreground text-sm mt-3">
                No payment required to check prices
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

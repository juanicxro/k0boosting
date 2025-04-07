import { useOrderStore } from "@/app/store/useOrderStore";
import {
  Award,
  Target,
  Globe,
  User,
  Shield,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { ADDONS } from "@/components/price-calculator/data";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { calculatePrice } from "@/components/price-calculator/pricing-data";

interface PriceInfo {
  basePrice: number;
  addonsPrice: number;
  totalPrice: number;
}

export function OrderSummary() {
  const {
    currentRank,
    desiredRank,
    selectedChampions,
    region,
    boostMode,
    addons,
  } = useOrderStore();

  const [priceInfo, setPriceInfo] = useState<PriceInfo | null>(null);

  useEffect(() => {
    // Calcula o preço sempre que as informações do pedido mudarem
    if (currentRank && desiredRank && region && boostMode) {
      const calculatedPrice = calculatePrice(
        region,
        boostMode,
        currentRank,
        desiredRank,
        selectedChampions,
        addons
      );
      setPriceInfo(calculatedPrice);
    } else {
      setPriceInfo(null);
    }
  }, [currentRank, desiredRank, selectedChampions, region, boostMode, addons]);

  const getAddonName = (addonId: string) => {
    const addon = ADDONS.find((a) => a.id === addonId);
    return addon ? addon.name : addonId;
  };

  // Determina quais seções devem ser mostradas com base no que foi preenchido
  const showRegion = Boolean(region);
  const showBoostMode = Boolean(boostMode);
  const showRanks = Boolean(currentRank) || Boolean(desiredRank);
  const showChampions = selectedChampions.length > 0;
  const showAddons = addons.length > 0;

  return (
    <div className="bg-card p-6 rounded-lg border border-border sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3">
        {/* Mostra as informações do pedido conforme são preenchidas */}
        {(showRegion || showBoostMode || showRanks) && (
          <div className="pb-3 border-b border-border">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              Boost Details
            </h3>
            <div className="space-y-2">
              {showRegion && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Region:</span>
                  <span className="font-medium ml-auto">{region}</span>
                </div>
              )}

              {showBoostMode && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Boost Mode:</span>
                  <span className="font-medium ml-auto capitalize">
                    {boostMode}
                  </span>
                </div>
              )}

              {currentRank && (
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Current Rank:</span>
                  <span className="font-medium ml-auto">{currentRank}</span>
                </div>
              )}

              {desiredRank && (
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Desired Rank:</span>
                  <span className="font-medium ml-auto">{desiredRank}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {showChampions && (
          <div className="py-3 border-b border-border">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              Champions ({selectedChampions.length})
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedChampions.map((champion) => (
                <Badge
                  key={champion}
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20 text-xs"
                >
                  {champion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {showAddons && (
          <div className="py-3 border-b border-border">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Add-ons</span>
              </div>
            </h3>
            <ul className="space-y-1 mt-1">
              {addons.map((addonId) => (
                <li key={addonId} className="text-sm">
                  • {getAddonName(addonId)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {priceInfo && (
          <div className="pt-3">
            <h3 className="font-medium text-base flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>Price Estimate</span>
            </h3>
            <div className="space-y-2 p-3 bg-primary/5 rounded-md border border-primary/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Base Price:
                </span>
                <span className="font-medium">${priceInfo.basePrice}</span>
              </div>

              {priceInfo.addonsPrice > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Add-ons:
                  </span>
                  <span className="font-medium">+${priceInfo.addonsPrice}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t border-border mt-1">
                <span className="font-medium">Total Price:</span>
                <span className="font-bold text-lg text-primary">
                  ${priceInfo.totalPrice}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mensagem quando nenhuma informação foi preenchida */}
      {!showRegion &&
        !showBoostMode &&
        !showRanks &&
        !showChampions &&
        !showAddons && (
          <div className="py-4 text-center text-muted-foreground">
            <p>Your order details will appear here as you make selections.</p>
          </div>
        )}

      <div className="mt-5">
        <button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
          disabled={!priceInfo}
        >
          Proceed to Checkout
          <ArrowRight className="h-4 w-4" />
        </button>
        {!priceInfo && (
          <p className="text-center text-muted-foreground text-xs mt-2">
            Complete all required selections to continue
          </p>
        )}
      </div>
    </div>
  );
}

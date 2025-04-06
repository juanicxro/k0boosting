"use client";
import { PriceCalculator } from "@/components/price-calculator/price-calculator";
import { OrderSummary } from "./components/order-summary";
import { SupportCard } from "./components/support-card";
import { BenefitsCard } from "./components/benefits-card";
import { useOrderStore } from "@/app/store/useOrderStore";

export default function OrderPage() {
  const { currentRank, desiredRank, selectedChampions } = useOrderStore();

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Complete Your Boost Order</h1>
          <p className="text-muted-foreground mb-6">
            Review and customize your boost order with additional options.
          </p>

          <OrderSummary
            currentRank={currentRank}
            desiredRank={desiredRank}
            selectedChampions={selectedChampions}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="md:order-2">
            <PriceCalculator />
          </div>

          <div className="space-y-6 md:order-1">
            <SupportCard />
            <BenefitsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

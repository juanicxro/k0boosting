import React from "react";
import { PriceCalculation } from "../hooks/usePriceCalculator";

interface PriceSummaryProps {
  price: PriceCalculation;
  onEditOptions: () => void;
}

export function PriceSummary({ price, onEditOptions }: PriceSummaryProps) {
  return (
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
        onClick={onEditOptions}
      >
        Edit Options
      </button>
    </div>
  );
}

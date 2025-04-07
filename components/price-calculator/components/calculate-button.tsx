import React from "react";

interface CalculateButtonProps {
  onClick: () => void;
}

export function CalculateButton({ onClick }: CalculateButtonProps) {
  return (
    <div className="pt-4">
      <button
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
        onClick={onClick}
      >
        Calculate Price
      </button>
      <p className="text-center text-muted-foreground text-sm mt-3">
        No payment required to check prices
      </p>
    </div>
  );
}

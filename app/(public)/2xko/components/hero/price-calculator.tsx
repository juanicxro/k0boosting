import React from "react";

export function PriceCalculator() {
  return (
    <div className="md:w-1/2 w-full">
      <div className="bg-card/95 backdrop-blur-sm border border-border p-8 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6">Check Your Price</h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Rank</label>
            <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Bronze</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
              <option>Diamond</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Desired Rank</label>
            <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
              <option>Diamond</option>
              <option>Master</option>
            </select>
          </div>

          <div className="pt-4">
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors">
              Calculate Price
            </button>
            <p className="text-center text-muted-foreground text-sm mt-3">
              No payment required to check prices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

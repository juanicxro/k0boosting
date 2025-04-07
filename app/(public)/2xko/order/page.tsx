"use client";
import { PriceCalculator } from "@/components/price-calculator/price-calculator";
import { OrderSummary } from "./components/order-summary";

export default function OrderPage() {
  return (
    <div className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Complete Your Boost Order</h1>
          <p className="text-muted-foreground text-sm">
            Review and customize your boost order with additional options.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:w-[70%] md:order-1">
            <PriceCalculator />
          </div>
          <div className="md:w-[30%] md:order-2">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

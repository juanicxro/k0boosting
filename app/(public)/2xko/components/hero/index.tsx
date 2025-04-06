import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";
import { PriceCalculator } from "./price-calculator";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <HeroContent />
          <PriceCalculator />
        </div>
      </div>
    </div>
  );
}

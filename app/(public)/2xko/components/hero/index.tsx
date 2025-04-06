import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <HeroContent />
      </div>
    </div>
  );
}

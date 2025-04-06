import { HeroSection } from "./components/hero";
import { BenefitsSection } from "./components/benefits";
import { HowItWorksSection } from "./components/how-it-works";
import { PricingSection } from "./components/sections/pricing-section";
import { TestimonialsSection } from "./components/testimonials";
import { FAQSection } from "./components/faq";
import { CTASection } from "./components/cta";

export default function TwoXKO() {
  return (
    <div className="bg-background text-foreground">
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}

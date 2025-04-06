import { SectionHeading } from "../ui/section-heading";
import { PricingPlan } from "./pricing-plan";
import { pricingPlansData } from "./pricing-data";

export function PricingSection() {
  return (
    <div className="bg-muted py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Our Boosting Packages"
          description="Choose the perfect boosting package that suits your needs and budget."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlansData.map((plan, i) => (
            <PricingPlan
              key={i}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              cta={plan.cta}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

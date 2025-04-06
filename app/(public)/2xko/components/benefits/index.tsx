import { SectionHeading } from "../ui/section-heading";
import { BenefitCard } from "./benefit-card";
import { benefitsData } from "./benefits-data";

export function BenefitsSection() {
  return (
    <div className="bg-muted py-24" id="benefits">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Why Choose Our 2xKO Boosting Service?"
          description="We offer the most reliable and professional boosting service in the industry with a team of elite players."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit, i) => (
            <BenefitCard
              key={i}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

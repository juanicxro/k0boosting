import { SectionHeading } from "../ui/section-heading";
import { StepCard } from "./step-card";
import { stepsData } from "./steps-data";

export function HowItWorksSection() {
  return (
    <div className="py-24 bg-background" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="How Our Boosting Service Works"
          description="Getting your account boosted is simple and straightforward with our service."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

          {stepsData.map((step, i) => (
            <StepCard
              key={i}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

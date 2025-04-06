import React from "react";
import { SectionHeading } from "../ui/section-heading";

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <div className="bg-card p-8 rounded-xl border border-border relative z-10">
      <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-6">
        {step}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Choose Your Boost",
      description:
        "Select your current and desired rank, and any additional options you want.",
    },
    {
      step: "02",
      title: "Make Payment",
      description:
        "Use our secure payment system to complete your order with confidence.",
    },
    {
      step: "03",
      title: "Track Progress",
      description:
        "Monitor the progress of your boost in real-time through our dashboard.",
    },
  ];

  return (
    <div className="py-24 bg-background" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="How Our Boosting Service Works"
          description="Getting your account boosted is simple and straightforward with our service."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

          {steps.map((step, i) => (
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

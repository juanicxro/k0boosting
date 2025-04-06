import { Check } from "lucide-react";

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

export function PricingPlan({
  title,
  price,
  description,
  features,
  popular,
  cta,
}: PricingPlanProps) {
  return (
    <div
      className={`bg-card rounded-xl border ${
        popular ? "border-primary" : "border-border"
      } overflow-hidden`}
    >
      {popular && (
        <div className="bg-primary py-1.5 px-4 text-center text-primary-foreground text-sm font-medium">
          Most Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">/ rank</span>
        </div>
        <p className="mt-2 text-muted-foreground">{description}</p>

        <ul className="mt-6 space-y-3">
          {features.map((feature, j) => (
            <li key={j} className="flex items-start">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`mt-8 w-full py-3 px-4 rounded-md font-medium ${
            popular
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-muted hover:bg-accent text-foreground"
          } transition-colors`}
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

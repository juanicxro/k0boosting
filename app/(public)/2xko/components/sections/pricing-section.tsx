import { Check } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popular: boolean;
  cta: string;
}

function PricingPlan({
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

export function PricingSection() {
  const plans = [
    {
      title: "Standard Boost",
      price: "$49",
      description: "Perfect for players looking to climb quickly",
      features: [
        "Solo queue boosting",
        "Normal speed completion",
        "24/7 support",
        "Basic VPN protection",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      title: "Premium Boost",
      price: "$79",
      description: "Our most popular boosting package",
      features: [
        "Solo queue boosting",
        "Priority boosting (faster)",
        "Play with specific champions",
        "Advanced VPN protection",
        "Live chat with your booster",
      ],
      popular: true,
      cta: "Choose Premium",
    },
    {
      title: "VIP Boost",
      price: "$129",
      description: "The ultimate boosting experience",
      features: [
        "Solo or duo queue boosting",
        "Highest priority (fastest)",
        "Play with specific champions",
        "Elite VPN protection",
        "Live chat with your booster",
        "1 Free coaching session",
        "Offline mode option",
      ],
      popular: false,
      cta: "Go VIP",
    },
  ];

  return (
    <div className="bg-muted py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Our Boosting Packages"
          description="Choose the perfect boosting package that suits your needs and budget."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
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

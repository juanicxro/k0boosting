import { Check, Users, Award, Clock, BookOpen } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

interface PricingFactorProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
}

function PricingFactor({
  title,
  description,
  icon,
  items,
}: PricingFactorProps) {
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-xl overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-6">{description}</p>

        <ul className="space-y-3 mb-6">
          {items.map((item, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PricingSection() {
  const pricingFactors = [
    {
      title: "Boost mode",
      icon: <Users className="w-6 h-6 text-primary" />,
      description: "Choose how you want your boost to be performed",
      items: [
        "Self-Piloted - Standard pricing",
        "Duo Boost - Play together with your booster",
        "Fully customizable boosting experience",
        "Complete account security",
      ],
    },
    {
      title: "Coaching",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      description: "Learn and improve with our professional coaching services",
      items: [
        "1-on-1 coaching sessions",
        "Replay analysis and feedback",
        "Champion-specific guidance",
        "Strategy and skill development",
        "Custom training programs",
      ],
    },
    {
      title: "Additional options",
      icon: <Award className="w-6 h-6 text-primary" />,
      description: "Customize your boost with additional features",
      items: [
        "Play Offline - Appear offline to friends",
        "Livestream - Watch your booster play",
        "Priority Boost - Complete your order faster",
        "Coaching Session - Learn from your booster",
      ],
    },
  ];

  return (
    <div className="bg-muted py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Personalized boosting pricing"
          description="Our prices are tailored to your specific needs based on several factors that affect the final cost."
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingFactors.map((factor, i) => (
              <PricingFactor
                key={i}
                title={factor.title}
                icon={factor.icon}
                description={factor.description}
                items={factor.items}
              />
            ))}
          </div>

          <div className="bg-card/95 backdrop-blur-sm border border-primary/30 rounded-xl p-6 mt-10">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg mb-2">Need help?</h4>
                <p className="text-muted-foreground mb-4">
                  Not sure what options to choose? Our support team is available
                  24/7 to help you find the perfect boosting package for your
                  needs.
                </p>
                <button className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md text-sm font-semibold transition-colors">
                  Contact support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

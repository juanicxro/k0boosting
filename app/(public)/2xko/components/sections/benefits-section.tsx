import { Check, Clock, Shield, Trophy, Users, Zap } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-card p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
      <div className="mb-5">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Trophy className="w-10 h-10 text-primary" />,
      title: "Top 1% Players",
      description:
        "Our boosters are among the highest ranked players globally with professional experience.",
    },
    {
      icon: <Shield className="w-10 h-10 text-primary" />,
      title: "Account Security",
      description:
        "We use VPN and take all necessary precautions to keep your account 100% safe.",
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Fast Completion",
      description:
        "Most orders are completed within 24-72 hours depending on the service requested.",
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Skill Improvement",
      description:
        "Learn from the best - request coaching sessions with our boosters to improve your skills.",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Duo Boosting",
      description:
        "Play alongside our professional boosters and learn while climbing the ranks.",
    },
    {
      icon: <Check className="w-10 h-10 text-primary" />,
      title: "24/7 Support",
      description:
        "Our support team is available round the clock to answer any questions you have.",
    },
  ];

  return (
    <div className="bg-muted py-24" id="benefits">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Why Choose Our 2xKO Boosting Service?"
          description="We offer the most reliable and professional boosting service in the industry with a team of elite players."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
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

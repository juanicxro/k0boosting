import { CTAButton } from "./cta-button";

export function CTASection() {
  return (
    <div className="bg-background py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Boost Your 2xKO Rank?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of satisfied players who have transformed their
            gameplay with our professional boosting services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <CTAButton href="#pricing" variant="primary">
              Get Started Now
            </CTAButton>
            <CTAButton href="#" variant="secondary">
              Contact Support
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

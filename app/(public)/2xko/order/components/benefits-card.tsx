export function BenefitsCard() {
  const benefits = [
    "Professional boosters with years of experience",
    "100% account safety guaranteed",
    "Fast completion times",
    "24/7 customer support",
    "Money-back guarantee",
  ];

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Why Choose Us?</h2>
      <ul className="space-y-2 text-muted-foreground">
        {benefits.map((benefit, index) => (
          <li key={index}>• {benefit}</li>
        ))}
      </ul>
    </div>
  );
}

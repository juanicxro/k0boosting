interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{question}</h3>
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

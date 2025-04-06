import { SectionHeading } from "../ui/section-heading";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{question}</h3>
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const faqs = [
    {
      question: "How long does the boosting process take?",
      answer:
        "The duration depends on your current rank, desired rank, and the package you choose. Typically, rank boosts take between 1-7 days. Premium and VIP packages receive priority and are completed faster.",
    },
    {
      question: "Is my account safe with your service?",
      answer:
        "Absolutely. We use VPN protection for all boosts and our professional boosters follow strict security protocols. We've completed thousands of boosts without a single account banned.",
    },
    {
      question: "Can I play on my account during the boost?",
      answer:
        "We recommend not playing on your account during the boosting process to avoid any conflicts. However, with our VIP package, you can arrange specific playing times with your booster.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and various cryptocurrencies. All transactions are secure and encrypted for your protection.",
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer:
        "Yes, we offer a 100% money-back guarantee if we fail to deliver the boosting service as promised. Customer satisfaction is our top priority.",
    },
  ];

  return (
    <div className="bg-muted py-24" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          description="Get answers to the most common questions about our boosting services."
        />

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

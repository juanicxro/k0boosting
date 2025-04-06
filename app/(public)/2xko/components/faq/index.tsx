import { SectionHeading } from "../ui/section-heading";
import { FAQItem } from "./faq-item";
import { faqData } from "./faq-data";

export function FAQSection() {
  return (
    <div className="bg-muted py-24" id="faq">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          title="Frequently Asked Questions"
          description="Get answers to the most common questions about our boosting services."
        />

        <div className="space-y-6">
          {faqData.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

import { SectionHeading } from "../ui/section-heading";
import { TestimonialCard } from "./testimonial-card";
import { testimonialsData } from "./testimonials-data";

export function TestimonialsSection() {
  return (
    <div className="py-24 bg-background" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="What our customers say"
          description="Don't just take our word for it - hear from our satisfied customers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              name={testimonial.name}
              avatar={testimonial.avatar}
              content={testimonial.content}
              rank={testimonial.rank}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

interface TestimonialCardProps {
  name: string;
  avatar: string;
  content: string;
  rank: string;
}

function TestimonialCard({
  name,
  avatar,
  content,
  rank,
}: TestimonialCardProps) {
  return (
    <div className="bg-card p-8 rounded-xl border border-border relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <div className="flex mt-1">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="w-4 h-4 fill-primary text-primary" />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-muted-foreground">&quot;{content}&quot;</p>
      </div>
      <div className="text-sm font-medium text-primary">{rank}</div>
    </div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex K.",
      avatar: "/avatar-1.jpg",
      content:
        "The boosting service was incredibly fast. My account went from Silver to Platinum in just 3 days. The booster was professional and even gave me some tips!",
      rank: "Silver → Platinum",
    },
    {
      name: "Jessica M.",
      avatar: "/avatar-2.jpg",
      content:
        "I was stuck in Gold for months. The Premium boost not only got me to Diamond but the coaching session helped me understand what I was doing wrong.",
      rank: "Gold → Diamond",
    },
    {
      name: "Marcus T.",
      avatar: "/avatar-3.jpg",
      content:
        "Best boosting service I've ever used. The duo option was great as I got to play and learn alongside a Master rank player. Worth every penny!",
      rank: "Platinum → Master",
    },
  ];

  return (
    <div className="py-24 bg-background" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="What Our Customers Say"
          description="Don't just take our word for it - hear from our satisfied customers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
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

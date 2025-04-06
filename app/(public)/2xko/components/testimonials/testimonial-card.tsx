import Image from "next/image";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  avatar: string;
  content: string;
  rank: string;
}

export function TestimonialCard({
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

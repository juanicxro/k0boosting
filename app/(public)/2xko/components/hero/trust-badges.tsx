import { Shield, Star, Users } from "lucide-react";

export function TrustBadges() {
  return (
    <div className="flex items-center gap-6 pt-8">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <span className="text-white/80 text-sm">500+ Reviews</span>
      </div>
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <span className="text-white/80 text-sm">100% Secure</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        <span className="text-white/80 text-sm">Elite Boosters</span>
      </div>
    </div>
  );
}

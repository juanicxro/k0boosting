import Image from "next/image";
import Link from "next/link";
import { Shield, Star, Users } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-2xko.jpg"
          alt="2xKO Boosting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-2">
              #1 Boosting Service for 2xKO
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Dominate the <span className="text-primary">2xKO</span> Arena
            </h1>
            <p className="text-lg text-slate-300">
              Take your gameplay to the next level with our premium boosting
              services. Our professional players will help you achieve your
              desired rank quickly and safely.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="#pricing"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
              >
                View Pricing
              </Link>
              <Link
                href="#how-it-works"
                className="bg-background/10 hover:bg-background/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-md font-semibold transition-colors text-white"
              >
                How It Works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
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
          </div>

          {/* Hero Form */}
          <div className="md:w-1/2 w-full">
            <div className="bg-card/95 backdrop-blur-sm border border-border p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Check Your Price</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Rank</label>
                  <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Bronze</option>
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                    <option>Diamond</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Desired Rank</label>
                  <select className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                    <option>Diamond</option>
                    <option>Master</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors">
                    Calculate Price
                  </button>
                  <p className="text-center text-muted-foreground text-sm mt-3">
                    No payment required to check prices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

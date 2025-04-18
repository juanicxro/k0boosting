"use client";
import Link from "next/link";
import { TrustBadges } from "./trust-badges";

export function HeroContent() {
  return (
    <div className="w-full max-w-3xl mx-auto text-center space-y-6">
      <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold mb-2">
        #1 Boosting service for 2xKO
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white">
        Dominate the <span className="text-primary">2xKO</span> Arena
      </h1>
      <p className="text-lg text-slate-300">
        Take your gameplay to the next level with our premium boosting services.
        Our professional players will help you achieve your desired rank quickly
        and safely.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link
          href="/2xko/order"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
        >
          BOOST NOW!
        </Link>
        <Link
          href="#how-it-works"
          className="bg-background/10 hover:bg-background/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-md font-semibold transition-colors text-white"
        >
          How it works
        </Link>
      </div>

      <TrustBadges />
    </div>
  );
}

import CardBanner from "@/public/card.png";
import Ahri from "@/public/ahri.png";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="block">Elevate your</span>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                gaming level
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Professional boosting services for your favorite games. Reach the
              next level with our team of experts.
            </p>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden drop-shadow-2xl drop-shadow-primary/50">
              <Image
                src={Ahri}
                alt="UniteBoost Hero"
                width={800}
                height={400}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div className="max-w-7xl mx-auto px-6 py-10" id="games">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Select your game</h2>
          <p className="text-muted-foreground mt-2">
            We offer services for various popular titles
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link href="/2xko" className="group">
            <div className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:shadow-primary/10 hover:scale-105">
              <div className="relative w-full h-full">
                <Image
                  src={CardBanner}
                  alt="2xko"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                  <p className="text-white font-bold text-xl p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    2xKO
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Placeholder for future games */}
          <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-card border border-dashed border-border flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">Coming Soon</p>
            </div>
          </div>

          <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-card border border-dashed border-border flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">Coming Soon</p>
            </div>
          </div>

          <div className="aspect-square rounded-xl overflow-hidden shadow-md bg-card border border-dashed border-border flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-muted-foreground/20 flex items-center justify-center mx-auto mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <p className="text-muted-foreground text-sm">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

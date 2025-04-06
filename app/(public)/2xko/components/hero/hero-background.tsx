import Image from "next/image";

export function HeroBackground() {
  return (
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
  );
}

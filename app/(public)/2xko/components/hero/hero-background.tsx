import Image from "next/image";
import hero2xko from "@/public/jinxhero.jpeg";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={hero2xko}
        alt="2xKO Boosting"
        fill
        className="object-cover bg-top"
        priority
      />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    </div>
  );
}

import React from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-16 ${className}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

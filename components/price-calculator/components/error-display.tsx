import React from "react";

interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  if (!message) return null;

  return (
    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md">
      {message}
    </div>
  );
}

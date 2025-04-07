import React from "react";
import { User, Users } from "lucide-react";

interface BoostModeSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onInputChange: () => void;
}

export function BoostModeSelector({
  value,
  onChange,
  onInputChange,
}: BoostModeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <User className="h-4 w-4" /> Boost Mode
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className={`p-2 border rounded-md flex items-center justify-center gap-2 ${
            value === "self-piloted"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-input hover:bg-muted/50"
          }`}
          onClick={() => {
            onChange("self-piloted");
            onInputChange();
          }}
        >
          <User className="h-4 w-4" /> Self-Piloted
        </button>
        <button
          type="button"
          className={`p-2 border rounded-md flex items-center justify-center gap-2 ${
            value === "duo"
              ? "bg-primary text-primary-foreground border-primary"
              : "border-input hover:bg-muted/50"
          }`}
          onClick={() => {
            onChange("duo");
            onInputChange();
          }}
        >
          <Users className="h-4 w-4" /> Duo Boost
        </button>
      </div>
    </div>
  );
}

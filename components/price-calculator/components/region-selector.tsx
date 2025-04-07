import React from "react";
import { Globe } from "lucide-react";
import { REGIONS } from "../data";

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
  onInputChange: () => void;
}

export function RegionSelector({
  value,
  onChange,
  onInputChange,
}: RegionSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Globe className="h-4 w-4" /> Region
      </label>
      <select
        className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onInputChange();
        }}
      >
        <option value="">Select your region</option>
        {REGIONS.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

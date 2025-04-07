import React from "react";
import { Shield, Video, Clock, GraduationCap } from "lucide-react";
import { ADDONS } from "../data";

interface AddonSelectorProps {
  selectedAddons: string[];
  onAddonToggle: (addonId: string) => void;
}

export function AddonSelector({
  selectedAddons,
  onAddonToggle,
}: AddonSelectorProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Clock":
        return <Clock className="h-4 w-4" />;
      case "GraduationCap":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium flex items-center gap-2">
        <Shield className="h-4 w-4" /> Additional Options
      </label>
      <div className="space-y-1.5 mt-1">
        {ADDONS.map((addon) => (
          <div
            key={addon.id}
            className={`p-1.5 border rounded-md cursor-pointer ${
              selectedAddons.includes(addon.id)
                ? "bg-primary/10 border-primary"
                : "border-input hover:bg-muted/50"
            }`}
            onClick={() => onAddonToggle(addon.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getIcon(addon.iconName)}
                <div>
                  <div className="font-medium text-xs">{addon.name}</div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {addon.description}
                  </div>
                </div>
              </div>
              <div className="text-primary font-medium text-xs">
                +${addon.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

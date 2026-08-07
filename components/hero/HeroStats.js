"use client";

import { NETWORKS } from "@/lib/config";
import { FlameIcon, ZapIcon, BridgeIcon, ShieldCheckIcon } from "@/components/icons";

// Roadmap-style stat row: only "Chains" has a live value today (it mirrors
// whatever's configured in the network switcher); the rest are marked
// "Soon" until those systems actually ship.
const HERO_STATS = [
  { id: "burned", label: "Burned", value: "Soon", icon: FlameIcon, live: false },
  { id: "gas", label: "Gas Sponsored", value: "Soon", icon: ZapIcon, live: false },
  { id: "chains", label: "Chains", value: `${NETWORKS.length}`, icon: BridgeIcon, live: true },
  { id: "assets", label: "Assets Protected", value: "Soon", icon: ShieldCheckIcon, live: false },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {HERO_STATS.map(({ id, icon: Icon, label, value, live }) => (
        <div
          key={id}
          className="flex flex-col items-center gap-2 rounded-xl bg-bg-card card-border py-4 text-center transition-colors duration-200 hover:border-white/20"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-purple/15 text-accent-violet">
            <Icon width="16" height="16" />
          </div>
          <p className="text-xs text-white/50">{label}</p>
          <p
            className={`font-display text-sm font-bold leading-none ${
              live ? "text-white" : "text-accent-gold"
            }`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}


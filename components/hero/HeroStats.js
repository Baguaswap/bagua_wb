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

function HeroStatCell({ icon: Icon, label, value, live }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-purple/15 text-accent-violet">
        <Icon width="13" height="13" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[9px] leading-none text-white/50">{label}</p>
        <p
          className={`font-display text-xs font-bold leading-tight sm:text-sm ${
            live ? "text-white" : "text-white/40"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function HeroStats() {
  return (
    <div className="group z-20 grid w-full max-w-xs grid-cols-2 gap-x-3 gap-y-3 rounded-xl bg-bg-card card-border p-3 shadow-glow transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_45px_rgba(139,92,246,0.4)] sm:absolute sm:-right-8 sm:-top-3 sm:w-44 sm:max-w-none">
      {HERO_STATS.map((stat) => (
        <HeroStatCell key={stat.id} {...stat} />
      ))}
    </div>
  );
}


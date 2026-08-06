"use client";

import { useEffect, useRef, useState } from "react";
import { RocketIcon, LockIcon, BarChartIcon, FlameIcon } from "@/components/icons";

// Live protocol stats, surfaced directly in the hero banner.
const HERO_STATS = [
  { id: "tvl", label: "TVL", value: 12.45, prefix: "$", suffix: "M", decimals: 2, icon: LockIcon },
  { id: "volume", label: "Volume (24H)", value: 3.24, prefix: "$", suffix: "M", decimals: 2, icon: BarChartIcon },
  { id: "burned", label: "Burned $BAGUA", value: 12.34, prefix: "", suffix: "M", decimals: 2, icon: FlameIcon },
  { id: "launched", label: "Tokens Launched", value: 256, prefix: "", suffix: "", decimals: 0, icon: RocketIcon },
];

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    }

    frame.current = requestAnimationFrame(tick);
    return () => frame.current && cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return value;
}

function HeroStatCell({ icon: Icon, label, value, prefix, suffix, decimals }) {
  const animated = useCountUp(value, 1400);

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-purple/15 text-accent-violet">
        <Icon width="13" height="13" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-[9px] leading-none text-white/50">{label}</p>
        <p className="font-display text-xs font-bold leading-tight text-white sm:text-sm">
          {prefix}
          {animated.toFixed(decimals)}
          {suffix}
        </p>
      </div>
    </div>
  );
}

export default function HeroStats() {
  return (
    <div className="group grid w-full max-w-xs grid-cols-2 gap-x-3 gap-y-3 rounded-xl bg-bg-card/90 card-border p-3 shadow-glow backdrop-blur transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_45px_rgba(139,92,246,0.4)] sm:absolute sm:-right-6 sm:top-2 sm:w-44 sm:max-w-none">
      {HERO_STATS.map((stat) => (
        <HeroStatCell key={stat.id} {...stat} />
      ))}
    </div>
  );
}

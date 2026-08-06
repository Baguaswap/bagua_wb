"use client";

import { useEffect, useRef, useState } from "react";
import { RocketIcon, DocsIcon, LockIcon, EthIcon, PlusCircleIcon } from "@/components/icons";
import { NETWORKS } from "@/lib/config";

const SLIDES_COUNT = 4;

// Real, live TVL — kept in sync with the number shown in StatsBar below.
const LIVE_TVL = 12.45;

// Orbit nodes are derived from the actually-configured networks so the Hero
// never advertises a chain the app doesn't support yet. A trailing "more"
// node hints at what's coming without overstating today's coverage.
const ORBIT_NODES = [
  ...NETWORKS.map((network) => ({
    id: network.id,
    name: network.name,
    iconUrl: network.iconUrl,
  })),
  { id: "more", name: "More chains soon", iconUrl: null, isMore: true },
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

function LiveBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-bg-card card-border px-3 py-1.5 text-xs font-medium text-white/70">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-hero-pulse-glow rounded-full bg-accent-green" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-green" />
      </span>
      Live on Giwa Chain
    </div>
  );
}

function TvlChip() {
  const tvl = useCountUp(LIVE_TVL, 1400);

  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-bg-card/90 card-border px-3 py-2 shadow-glow backdrop-blur sm:absolute sm:-right-1 sm:-top-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-purple/15 text-accent-violet">
        <LockIcon width="16" height="16" />
      </div>
      <div>
        <p className="text-[10px] leading-none text-white/50">Total Value Locked</p>
        <p className="font-display text-sm font-bold leading-tight text-white">
          ${tvl.toFixed(2)}M
        </p>
      </div>
    </div>
  );
}

function OrbitNode({ node, angle, radius, size, duration }) {
  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
    >
      <div
        className="animate-hero-spin-reverse flex items-center justify-center"
        style={{
          animationDuration: `${duration}s`,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
        }}
        title={node.name}
      >
        <div
          className={`group relative flex items-center justify-center rounded-full card-border transition-transform duration-300 hover:scale-110 ${
            node.isMore ? "bg-bg-card/80 text-white/50" : "bg-bg-card text-white/90"
          }`}
          style={{ width: size, height: size }}
        >
          {node.isMore ? (
            <PlusCircleIcon width={size * 0.5} height={size * 0.5} />
          ) : node.iconUrl ? (
            <img src={node.iconUrl} alt={node.name} className="h-1/2 w-1/2 rounded-full" />
          ) : (
            <EthIcon width={size * 0.5} height={size * 0.5} />
          )}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-accent-purple/0 shadow-[0_0_0_0_rgba(139,92,246,0)] transition-shadow duration-300 group-hover:bg-accent-purple/10 group-hover:shadow-[0_0_18px_4px_rgba(139,92,246,0.35)]" />
        </div>
      </div>
    </div>
  );
}

function OrbitSystem() {
  const count = ORBIT_NODES.length;
  const radius = 78;
  const duration = 34;

  return (
    <div
      className="animate-hero-spin-slow absolute inset-0"
      style={{ animationDuration: `${duration}s` }}
      aria-hidden="true"
    >
      {ORBIT_NODES.map((node, i) => (
        <OrbitNode
          key={node.id}
          node={node}
          angle={(360 / count) * i}
          radius={radius}
          size={34}
          duration={duration}
        />
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
      {/* Layered glow behind the mark */}
      <div className="animate-hero-pulse-glow absolute inset-0 rounded-full bg-accent-purple/25 blur-2xl" />
      <div className="absolute inset-6 rounded-full bg-accent-gold/15 blur-2xl" />

      {/* Slowly rotating orbit ring with chain nodes */}
      <OrbitSystem />

      {/* Static outer ring for depth */}
      <div className="absolute inset-8 rounded-full border border-white/5" />

      {/* Centerpiece — the Bagua mark */}
      <div className="animate-hero-float relative">
        <svg
          viewBox="0 0 100 100"
          className="relative h-28 w-28 drop-shadow-[0_0_25px_rgba(245,179,36,0.35)] sm:h-32 sm:w-32"
        >
          <polygon
            points="50,3 84,20 97,50 84,80 50,97 16,80 3,50 16,20"
            fill="#171123"
            stroke="#F5B324"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#F5B324" strokeWidth="2" />
          <path d="M50 20a15 15 0 0 0 0 30 15 15 0 0 1 0 30 30 30 0 0 1 0-60Z" fill="#F5B324" />
          <circle cx="50" cy="35" r="3.2" fill="#171123" />
          <circle cx="50" cy="65" r="3.2" fill="#F5B324" />
        </svg>
      </div>

      <TvlChip />
    </div>
  );
}

export default function Hero({ onLaunchClick, onDocsClick }) {
  const [slide, setSlide] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    function handlePointerMove(e) {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    el.addEventListener("pointermove", handlePointerMove);
    return () => el.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative mx-4 overflow-hidden rounded-2xl card-border bg-bg-panel"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="hero-glow-gold pointer-events-none absolute inset-0" />
      <div className="hero-mouse-glow pointer-events-none absolute inset-0" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Cosmic dust particles */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <span className="hero-particle absolute left-[12%] top-[20%] h-1 w-1 rounded-full bg-accent-violet/70" style={{ animationDelay: "0s" }} />
        <span className="hero-particle absolute left-[85%] top-[30%] h-1.5 w-1.5 rounded-full bg-accent-gold/60" style={{ animationDelay: "1.4s" }} />
        <span className="hero-particle absolute left-[70%] top-[75%] h-1 w-1 rounded-full bg-accent-purple/70" style={{ animationDelay: "2.6s" }} />
        <span className="hero-particle absolute left-[25%] top-[80%] h-1.5 w-1.5 rounded-full bg-accent-violet/50" style={{ animationDelay: "3.8s" }} />
        <span className="hero-particle absolute left-[45%] top-[15%] h-1 w-1 rounded-full bg-accent-gold/50" style={{ animationDelay: "5s" }} />
      </div>

      <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:items-center">
        <div>
          <LiveBadge />

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Trade. Launch.
            <br />
            <span className="text-accent-gold">Burn.</span> Grow.
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Bagua Swap is a DEX &amp; meme coin launchpad on Giwa Chain with a $BAGUA
            burn mechanism on every transaction.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onLaunchClick}
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-accent-gold px-4 py-2.5 text-sm font-semibold text-bg transition-all duration-200 hover:shadow-glow active:scale-95"
            >
              <RocketIcon
                width="18"
                height="18"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              Launch Your Token
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
            </button>
            <button
              onClick={onDocsClick}
              className="flex items-center gap-2 rounded-xl card-border bg-bg-card px-4 py-2.5 text-sm font-semibold text-white/90 transition-all duration-200 hover:border-white/20 hover:bg-white/5 active:scale-95"
            >
              <DocsIcon width="18" height="18" />
              View Docs
            </button>
          </div>
        </div>

        <HeroVisual />
      </div>

      <div className="relative flex justify-center gap-1.5 pb-4">
        {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === slide ? "w-5 bg-accent-purple" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

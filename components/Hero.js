"use client";

import { useRef } from "react";
import { RocketIcon, DocsIcon } from "@/components/icons";
import { NETWORKS } from "@/lib/config";
import LiveBadge from "@/components/hero/LiveBadge";
import HeroBackground from "@/components/hero/HeroBackground";
import HeroLogo from "@/components/hero/HeroLogo";
import ChainOrbit from "@/components/hero/ChainOrbit";
import HeroStats from "@/components/hero/HeroStats";
import RippleButton from "@/components/hero/RippleButton";
import useHeroParallax from "@/components/hero/useHeroParallax";

// Orbit nodes showcase the mainnet chains only (the network switcher up in
// the header still lists every entry, testnets included) — this keeps the
// hero visual as a clean "multi-chain" marketing shot.
const ORBIT_NODES = [
  ...NETWORKS.filter((network) => network.type === "mainnet").map((network) => ({
    id: network.id,
    name: network.name,
    iconUrl: network.iconUrl,
    icon: network.icon,
  })),
  { id: "more", name: "More chains soon", iconUrl: null, isMore: true },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto flex max-w-xs flex-col items-center gap-4 sm:max-w-none sm:pr-16">
      <div className="relative z-0 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        {/* Layered glow behind the mark */}
        <div className="animate-hero-pulse-glow absolute inset-0 rounded-full bg-accent-purple/25 blur-2xl" />
        <div className="absolute inset-6 rounded-full bg-accent-gold/15 blur-2xl" />

        {/* Slowly rotating orbit ring with chain nodes + energy lines */}
        <ChainOrbit nodes={ORBIT_NODES} />

        {/* Static outer ring for depth */}
        <div className="absolute inset-8 rounded-full border border-white/5" />

        {/* Centerpiece — the Bagua mark, untouched, just orchestrated */}
        <HeroLogo />
      </div>

      {/* Live stats */}
      <HeroStats />
    </div>
  );
}

export default function Hero({ onLaunchClick, onDocsClick }) {
  const heroRef = useRef(null);
  useHeroParallax(heroRef);

  return (
    <section
      ref={heroRef}
      className="relative mx-4 overflow-hidden rounded-2xl card-border bg-bg-panel"
    >
      <div className="hero-parallax-bg pointer-events-none absolute inset-0">
        <HeroBackground />
      </div>

      <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:items-center">
        <div>
          <LiveBadge />

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Build Once.
            <br />
            <span className="text-accent-gold">Launch</span> Anywhere.
          </h1>

          <div className="mt-5 flex flex-wrap gap-3">
            <RippleButton
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
            </RippleButton>
            <RippleButton
              onClick={onDocsClick}
              className="group relative flex items-center gap-2 overflow-hidden rounded-xl card-border bg-bg-card px-4 py-2.5 text-sm font-semibold text-white/90 transition-all duration-200 hover:border-white/20 hover:bg-white/5 active:scale-95"
            >
              <DocsIcon width="18" height="18" />
              View Docs
            </RippleButton>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

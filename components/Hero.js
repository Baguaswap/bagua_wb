"use client";

import { useRef } from "react";
import { RocketIcon, DocsIcon } from "@/components/icons";
import LiveBadge from "@/components/hero/LiveBadge";
import HeroBackground from "@/components/hero/HeroBackground";
import HeroStats from "@/components/hero/HeroStats";
import RippleButton from "@/components/hero/RippleButton";
import useHeroParallax from "@/components/hero/useHeroParallax";

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

      <div className="relative flex flex-col gap-5 p-5">
        <div className="grid grid-cols-5 items-center gap-3">
          <div className="col-span-3">
            <LiveBadge />

            <h1 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              Build Once.
              <br />
              <span className="text-accent-gold">Launch</span>
              <br />
              Anywhere.
            </h1>

            <p className="mt-3 text-xs leading-relaxed text-white/60 sm:text-base">
              The ultimate platform to launch, trade, and grow meme tokens.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <RippleButton
                onClick={onLaunchClick}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent-gold px-3.5 py-2.5 text-xs font-semibold text-bg transition-all duration-200 hover:shadow-glow active:scale-95 sm:text-sm"
              >
                <RocketIcon
                  width="16"
                  height="16"
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                Launch Your Token
                <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
              </RippleButton>
              <RippleButton
                onClick={onDocsClick}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl card-border bg-bg-card px-3.5 py-2.5 text-xs font-semibold text-white/90 transition-all duration-200 hover:border-white/20 hover:bg-white/5 active:scale-95 sm:text-sm"
              >
                <DocsIcon width="16" height="16" className="shrink-0" />
                View Docs
              </RippleButton>
            </div>
          </div>

          {/* Hero visual — hand + coin artwork, glow behind, height-capped so
              the row stays compact/landscape instead of stacking tall. */}
          <div className="relative col-span-2 flex h-40 items-center justify-center sm:h-56">
            <div className="animate-hero-pulse-glow pointer-events-none absolute inset-0 m-auto h-full w-full rounded-full bg-accent-gold/20 blur-3xl" />
            <img
              src="/hero-hand.png"
              alt="Bagua coin held in a robotic hand"
              className="hero-parallax-logo animate-hero-float relative h-full w-auto object-contain drop-shadow-[0_0_35px_rgba(245,179,36,0.35)]"
            />
          </div>
        </div>

        <HeroStats />
      </div>
    </section>
  );
}

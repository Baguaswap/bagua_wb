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

      <div className="relative flex flex-col gap-6 p-6">
        <div>
          <LiveBadge />

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            Build Once.
            <br />
            <span className="text-accent-gold">Launch</span>
            <br />
            Anywhere.
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base">
            The ultimate platform to launch, trade, and grow meme tokens.
          </p>

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

        {/* Hero visual — the hand + coin artwork, full width, glow behind it */}
        <div className="relative -my-4 flex items-center justify-center">
          <div className="animate-hero-pulse-glow pointer-events-none absolute inset-0 m-auto h-2/3 w-2/3 rounded-full bg-accent-gold/25 blur-3xl" />
          <img
            src="/hero-hand.png"
            alt="Bagua coin held in a robotic hand"
            className="hero-parallax-logo animate-hero-float relative w-full max-w-md drop-shadow-[0_0_35px_rgba(245,179,36,0.35)]"
          />
        </div>

        <HeroStats />
      </div>
    </section>
  );
}

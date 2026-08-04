"use client";

import { useState } from "react";
import { RocketIcon, DocsIcon } from "@/components/icons";

const SLIDES_COUNT = 4;

export default function Hero({ onLaunchClick, onDocsClick }) {
  const [slide, setSlide] = useState(0);

  return (
    <section className="relative mx-4 overflow-hidden rounded-2xl card-border bg-bg-panel">
      <div className="hero-glow pointer-events-none absolute inset-0" />

      <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Trade. Launch.
            <br />
            <span className="text-accent-gold">Burn.</span> Grow.
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Bagua Swap is a DEX & meme coin launchpad on Giwa Chain with a $BAGUA
            burn mechanism on every transaction.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onLaunchClick}
              className="flex items-center gap-2 rounded-xl bg-accent-gold px-4 py-2.5 text-sm font-semibold text-bg"
            >
              <RocketIcon width="18" height="18" />
              Launch Your Token
            </button>
            <button
              onClick={onDocsClick}
              className="flex items-center gap-2 rounded-xl card-border bg-bg-card px-4 py-2.5 text-sm font-semibold text-white/90"
            >
              <DocsIcon width="18" height="18" />
              View Docs
            </button>
          </div>
        </div>

        <div className="relative mx-auto flex h-40 w-40 items-center justify-center sm:h-52 sm:w-52">
          <div className="absolute inset-0 rounded-full bg-accent-purple/25 blur-2xl" />
          <svg viewBox="0 0 100 100" className="relative h-full w-full drop-shadow-[0_0_25px_rgba(245,179,36,0.35)]">
            <polygon
              points="50,3 84,20 97,50 84,80 50,97 16,80 3,50 16,20"
              fill="#171123"
              stroke="#F5B324"
              strokeWidth="2.5"
            />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#F5B324" strokeWidth="2" />
            <path
              d="M50 20a15 15 0 0 0 0 30 15 15 0 0 1 0 30 30 30 0 0 1 0-60Z"
              fill="#F5B324"
            />
            <circle cx="50" cy="35" r="3.2" fill="#171123" />
            <circle cx="50" cy="65" r="3.2" fill="#F5B324" />
          </svg>
        </div>
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

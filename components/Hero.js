"use client";

import { useState } from "react";
import {
  RocketIcon,
  DocsIcon,
  FlameIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "@/components/icons";

const SLIDES_COUNT = 4;

const FEATURES = [
  { icon: FlameIcon, label: "Deflationary Burn", sub: "$BAGUA burned every tx" },
  { icon: ShieldCheckIcon, label: "Secure & Audited", sub: "Contracts are audited" },
  { icon: RocketIcon, label: "Launchpad for Memes", sub: "Fair launch platform" },
  { icon: TrendingUpIcon, label: "Built on Giwa Chain", sub: "Fast, low fees" },
];

export default function Hero({ onLaunchClick, onDocsClick }) {
  const [slide, setSlide] = useState(0);

  return (
    <section className="relative mx-4 overflow-hidden rounded-2xl border border-[#123024] bg-[#050807]">
      {/* teal glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 78% 25%, rgba(30,230,168,0.28), transparent 70%)",
        }}
      />
      {/* faint candlestick pattern, right edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 items-end justify-end gap-1 overflow-hidden opacity-20 sm:flex">
        {[40, 55, 35, 70, 50, 80, 60, 90].map((h, i) => (
          <span
            key={i}
            className="w-2 rounded-sm bg-[#1EE6A8]"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="relative grid gap-6 p-6 sm:grid-cols-2 sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
            Trade. <span className="text-[#1EE6A8]">Launch.</span>
            <br />
            <span className="text-[#1EE6A8]">Burn.</span> Grow.
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/60">
            Bagua Swap is a DEX & meme coin launchpad on Giwa Chain with a{" "}
            <span className="text-[#1EE6A8]">$BAGUA</span> burn mechanism on
            every transaction.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onLaunchClick}
              className="flex items-center gap-2 rounded-xl bg-[#1EE6A8] px-4 py-2.5 text-sm font-semibold text-[#04140F]"
            >
              <RocketIcon width="18" height="18" />
              Launch Your Token
            </button>
            <button
              onClick={onDocsClick}
              className="flex items-center gap-2 rounded-xl border border-[#1EE6A8]/30 bg-[#0B1512] px-4 py-2.5 text-sm font-semibold text-white/90"
            >
              <DocsIcon width="18" height="18" />
              View Docs
            </button>
          </div>
        </div>

        <div className="relative mx-auto flex h-36 w-52 items-center justify-center sm:h-48 sm:w-72">
          <div className="absolute inset-0 rounded-full bg-[#1EE6A8]/20 blur-2xl" />
          <div className="absolute bottom-0 h-6 w-28 rounded-full bg-[#1EE6A8]/40 blur-xl" />
          <img
            src="/hero-coin.png"
            alt="Bagua Swap"
            className="relative h-full w-full object-contain drop-shadow-[0_0_25px_rgba(30,230,168,0.35)]"
          />
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-2 border-t border-[#123024] p-4 sm:grid-cols-4">
        {FEATURES.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-start gap-2 rounded-xl bg-[#0B1512] p-2.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1EE6A8]/15 text-[#1EE6A8]">
              <Icon width="14" height="14" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white/90">{label}</p>
              <p className="truncate text-[11px] text-white/40">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex justify-center gap-1.5 pb-4 pt-3">
        {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === slide ? "w-5 bg-[#1EE6A8]" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

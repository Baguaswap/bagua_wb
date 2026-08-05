"use client";

import { useState } from "react";
import { RocketIcon, DocsIcon } from "@/components/icons";

const SLIDES_COUNT = 4;

export default function Hero({ onLaunchClick, onDocsClick }) {
  const [slide, setSlide] = useState(0);

  return (
    <section
      className="relative mx-4 overflow-hidden rounded-2xl border border-[#123024] bg-[#050807]"
      style={{ aspectRatio: "1672 / 940" }}
    >
      {/* full wallpaper background */}
      <img
        src="/hero-banner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* dark overlay so text stays readable */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(5,8,7,0.88) 0%, rgba(5,8,7,0.55) 45%, rgba(5,8,7,0.15) 75%), linear-gradient(to top, rgba(5,8,7,0.85) 0%, transparent 30%)",
        }}
      />

      <div className="relative flex h-full flex-col p-4 sm:p-6">
        <h1 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
          Trade. <span className="text-[#38BDF8]">Launch.</span>
          <br />
          <span className="text-[#1EE6A8]">Burn.</span>{" "}
          <span className="text-[#A78BFA]">Grow.</span>
        </h1>
        <p className="mt-2 max-w-sm text-xs text-white/70 sm:mt-3 sm:text-sm">
          Bagua Swap is a DEX & meme coin launchpad on Giwa Chain with a{" "}
          <span className="text-[#1EE6A8]">$BAGUA</span> burn mechanism on
          every transaction.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">
          <button
            onClick={onLaunchClick}
            className="flex items-center gap-2 rounded-xl bg-[#1EE6A8] px-3 py-2 text-xs font-semibold text-[#04140F] sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <RocketIcon width="16" height="16" />
            Launch Your Token
          </button>
          <button
            onClick={onDocsClick}
            className="flex items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-xs font-semibold text-white/90 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <DocsIcon width="16" height="16" />
            View Docs
          </button>
        </div>

        <div className="mt-auto flex justify-center gap-1.5 pt-2">
          {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === slide ? "w-5 bg-[#1EE6A8]" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

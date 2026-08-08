"use client";

import { useMemo, useState } from "react";

const TIMEFRAMES = [
  { key: "1D", label: "1D" },
  { key: "1W", label: "1W" },
  { key: "1M", label: "1M" },
  { key: "1Y", label: "1Y" },
  { key: "ALL", label: "ALL" },
];

const TIMEFRAME_LABELS = {
  "1D": ["09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "Now"],
  "1W": ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Ming"],
  "1M": ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
  "1Y": ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
  ALL: ["2022", "2023", "2024", "2025", "2026"],
};

// Which x-axis labels actually get printed under the bars, per timeframe
// (dense sets like 1D/1Y would overlap on a phone screen if we show all of them).
const TIMEFRAME_LABEL_STEP = {
  "1D": 2,
  "1W": 1,
  "1M": 1,
  "1Y": 3,
  ALL: 1,
};

// Deterministic seeded RNG so switching timeframes always gives the same
// look for that timeframe (no re-randomizing on every render).
function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateBarData(timeframeKey) {
  const labels = TIMEFRAME_LABELS[timeframeKey];
  const step = TIMEFRAME_LABEL_STEP[timeframeKey];
  const rand = mulberry32(hashSeed(timeframeKey));
  let base = 4000 + rand() * 4000;

  return labels.map((label, i) => {
    base = Math.max(2000, base + (rand() - 0.35) * 9000);
    return {
      label,
      value: Math.round(base),
      showLabel: i % step === 0 || i === labels.length - 1,
    };
  });
}

function formatK(value) {
  if (value >= 1000) {
    const k = value / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return `${value}`;
}

function BurnBarChart({ data }) {
  const w = 300;
  const h = 100;
  const padX = 4;
  const maxValue = Math.max(...data.map((d) => d.value));
  const ticks = [1, 0.75, 0.5, 0.25, 0].map((f) => Math.round(maxValue * f));
  const slot = (w - padX * 2) / data.length;
  const barWidth = Math.min(20, slot * 0.5);

  return (
    <div className="relative mt-3 overflow-hidden rounded-lg card-border bg-black/20 p-3">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-purple/[0.08] to-transparent" />

      <div className="relative flex gap-2">
        <div className="flex h-24 flex-col justify-between py-0.5 text-right text-[9px] text-white/30">
          {ticks.map((t, i) => (
            <span key={i}>{formatK(t)}</span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="h-24 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="burnBarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5B324" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                x1="0"
                x2={w}
                y1={h * f}
                y2={h * f}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
            ))}

            {data.map((d, i) => {
              const cx = padX + slot * i + slot / 2;
              const barH = Math.max((d.value / maxValue) * (h - 4), 2);
              return (
                <rect
                  key={i}
                  x={cx - barWidth / 2}
                  y={h - barH}
                  width={barWidth}
                  height={barH}
                  rx="2.5"
                  fill="url(#burnBarGradient)"
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              );
            })}

            <line x1="0" x2={w} y1={h} y2={h} stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          </svg>

          <div className="mt-1 flex text-[9px] text-white/35">
            {data.map((d, i) => (
              <span key={i} style={{ width: `${100 / data.length}%` }} className="text-center">
                {d.showLabel ? d.label : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BurnStats() {
  const [timeframe, setTimeframe] = useState("1D");
  const data = useMemo(() => generateBarData(timeframe), [timeframe]);

  return (
    <div className="rounded-xl bg-bg-card card-border p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-display font-bold text-white">$BAGUA Burn Stats</h3>
        <a href="#" className="shrink-0 text-xs font-medium text-accent-purple">
          View Details
        </a>
      </div>

      <p className="text-xs text-white/50">Total Burned</p>
      <p className="font-display text-2xl font-bold text-accent-gold">12,345,678</p>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-white/50">Burn Value (USD)</p>
          <p className="font-semibold text-white">$30,245.67</p>
        </div>
        <div>
          <p className="text-white/50">Last 24H Burned</p>
          <p className="font-semibold text-accent-green">+345,678</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs font-medium text-white/60">$BAGUA Burn Activity</p>
        <div className="flex gap-1 rounded-lg bg-black/20 p-0.5">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.key}
              type="button"
              onClick={() => setTimeframe(tf.key)}
              className={`rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                tf.key === timeframe
                  ? "bg-accent-purple text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <BurnBarChart data={data} />
    </div>
  );
}

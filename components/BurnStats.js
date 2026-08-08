"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

const TIMEFRAMES = [
  { key: "1m", label: "1 Menit", axisFrom: "20m ago" },
  { key: "5m", label: "5 Menit", axisFrom: "1j 40m ago" },
  { key: "15m", label: "15 Menit", axisFrom: "5j ago" },
  { key: "30m", label: "30 Menit", axisFrom: "10j ago" },
  { key: "1h", label: "1 Jam", axisFrom: "20j ago" },
  { key: "4h", label: "4 Jam", axisFrom: "80j ago" },
  { key: "12h", label: "12 Jam", axisFrom: "10 hari lalu" },
  { key: "24h", label: "24 Jam", axisFrom: "20 hari lalu" },
  { key: "1w", label: "Seminggu", axisFrom: "20 minggu lalu" },
  { key: "1M", label: "Sebulan", axisFrom: "20 bulan lalu" },
  { key: "all", label: "All Time", axisFrom: "Sejak awal" },
];

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

function generateCandles(timeframeKey, count = 20) {
  const rand = mulberry32(hashSeed(timeframeKey));
  let base = 20 + rand() * 15;
  const candles = [];
  for (let i = 0; i < count; i++) {
    const drift = 1.5 + rand() * 5;
    const noise = (rand() - 0.45) * 9;
    const open = base;
    const close = Math.max(4, open + drift + noise);
    const high = Math.max(open, close) + rand() * 5;
    const low = Math.max(2, Math.min(open, close) - rand() * 5);
    candles.push({ open, close, high, low });
    base = close;
  }
  return candles;
}

function TimeframeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const current = TIMEFRAMES.find((t) => t.key === value) ?? TIMEFRAMES[7];

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 rounded-lg card-border bg-bg-card px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:border-white/20 hover:bg-white/5 active:scale-95"
      >
        {current.label}
        <ChevronDownIcon
          width="12"
          height="12"
          className={`text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-20 max-h-64 w-36 overflow-y-auto rounded-xl card-border bg-bg-panel p-1 shadow-xl"
        >
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.key}
              type="button"
              role="option"
              aria-selected={tf.key === value}
              onClick={() => {
                onChange(tf.key);
                setOpen(false);
              }}
              className={`block w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                tf.key === value
                  ? "bg-accent-purple text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BurnCandlestick({ data, axisFrom }) {
  const w = 300;
  const h = 96;
  const padX = 4;
  const high = Math.max(...data.map((d) => d.high));
  const low = Math.min(...data.map((d) => d.low));
  const range = high - low || 1;
  const slot = (w - padX * 2) / data.length;
  const bodyWidth = Math.min(8, slot * 0.55);

  const y = (v) => h - ((v - low) / range) * h;

  return (
    <div className="relative mt-3 overflow-hidden rounded-lg card-border bg-black/20 p-2">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-purple/[0.08] to-transparent" />
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="relative h-24 w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {[0.25, 0.5, 0.75].map((f) => (
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
          const up = d.close >= d.open;
          const color = up ? "#22C55E" : "#EF4444";
          const bodyTop = y(Math.max(d.open, d.close));
          const bodyBottom = y(Math.min(d.open, d.close));
          const bodyHeight = Math.max(bodyBottom - bodyTop, 1.5);

          return (
            <g key={i} className="transition-opacity duration-200 hover:opacity-80">
              <line
                x1={cx}
                x2={cx}
                y1={y(d.high)}
                y2={y(d.low)}
                stroke={color}
                strokeWidth="1"
                opacity="0.65"
              />
              <rect
                x={cx - bodyWidth / 2}
                y={bodyTop}
                width={bodyWidth}
                height={bodyHeight}
                rx="1.5"
                fill={color}
                opacity={up ? 0.95 : 0.85}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-1 flex items-center justify-between text-[10px] text-white/35">
        <span>{axisFrom}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" /> Naik
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-red" /> Turun
          </span>
        </div>
        <span>Sekarang</span>
      </div>
    </div>
  );
}

export default function BurnStats() {
  const [timeframe, setTimeframe] = useState("24h");
  const active = TIMEFRAMES.find((t) => t.key === timeframe) ?? TIMEFRAMES[7];
  const candles = useMemo(() => generateCandles(timeframe, 20), [timeframe]);

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
        <p className="text-[11px] text-white/40">Grafik burn per periode</p>
        <TimeframeDropdown value={timeframe} onChange={setTimeframe} />
      </div>

      <BurnCandlestick data={candles} axisFrom={active.axisFrom} />
    </div>
  );
}

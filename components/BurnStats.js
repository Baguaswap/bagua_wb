const CANDLE_DATA = [
  { open: 20, close: 28, high: 32, low: 16 },
  { open: 28, close: 24, high: 30, low: 20 },
  { open: 24, close: 35, high: 38, low: 22 },
  { open: 35, close: 30, high: 37, low: 27 },
  { open: 30, close: 42, high: 45, low: 28 },
  { open: 42, close: 38, high: 44, low: 35 },
  { open: 38, close: 50, high: 53, low: 36 },
  { open: 50, close: 45, high: 52, low: 42 },
  { open: 45, close: 58, high: 61, low: 43 },
  { open: 58, close: 52, high: 60, low: 49 },
  { open: 52, close: 62, high: 65, low: 50 },
  { open: 62, close: 55, high: 64, low: 52 },
  { open: 55, close: 68, high: 71, low: 53 },
  { open: 68, close: 60, high: 70, low: 57 },
  { open: 60, close: 72, high: 75, low: 58 },
  { open: 72, close: 65, high: 74, low: 62 },
  { open: 65, close: 78, high: 81, low: 63 },
  { open: 78, close: 70, high: 80, low: 67 },
  { open: 70, close: 82, high: 85, low: 68 },
  { open: 82, close: 68, high: 88, low: 79 },
];

function BurnCandlestick({ data }) {
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
    <div className="relative mt-3 overflow-hidden rounded-lg bg-black/20 p-2">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-gold/[0.06] to-transparent" />
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
          const color = up ? "#4ADE80" : "#FB7185";
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
        <span>20D ago</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" /> Naik
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FB7185]" /> Turun
          </span>
        </div>
        <span>Hari ini</span>
      </div>
    </div>
  );
}

export default function BurnStats() {
  return (
    <div className="rounded-xl bg-bg-card card-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display font-bold text-white">$BAGUA Burn Stats</h3>
        <a href="#" className="text-xs font-medium text-accent-purple">
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
          <p className="font-semibold text-[#4ADE80]">+345,678</p>
        </div>
      </div>

      <Bur

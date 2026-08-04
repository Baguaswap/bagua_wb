const SPARKLINE_POINTS = [
  20, 28, 24, 35, 30, 42, 38, 50, 45, 58, 52, 62, 55, 68, 60, 72, 65, 78, 70, 82,
];

function Sparkline({ points }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 280;
  const h = 80;
  const step = w / (points.length - 1);

  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-20 w-full" preserveAspectRatio="none">
      <path d={path} fill="none" stroke="#A78BFA" strokeWidth="2" />
    </svg>
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
      <p className="font-display text-2xl font-bold text-white">12,345,678</p>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-white/50">Burn Value (USD)</p>
          <p className="font-semibold text-white">$30,245.67</p>
        </div>
        <div>
          <p className="text-white/50">Last 24H Burned</p>
          <p className="font-semibold text-white">345,678</p>
        </div>
      </div>

      <Sparkline points={SPARKLINE_POINTS} />
    </div>
  );
}

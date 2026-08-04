import { LockIcon, BarChartIcon, FlameIcon, RocketIcon } from "@/components/icons";

const STATS = [
  { label: "TVL", sub: "(Total Value Locked)", value: "$12.45M", icon: LockIcon },
  { label: "Volume (24H)", value: "$3.24M", icon: BarChartIcon },
  { label: "Burned $BAGUA", value: "12.34M", icon: FlameIcon },
  { label: "Tokens Launched", value: "256", icon: RocketIcon },
];

export default function StatsBar() {
  return (
    <section className="mx-4 mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS.map(({ label, sub, value, icon: Icon }) => (
        <div key={label} className="rounded-xl bg-bg-card card-border p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent-purple/15 text-accent-violet">
            <Icon width="18" height="18" />
          </div>
          <p className="text-xs text-white/50">
            {label} {sub && <span className="block text-[10px]">{sub}</span>}
          </p>
          <p className="mt-1 font-display text-lg font-bold text-white">{value}</p>
        </div>
      ))}
    </section>
  );
}

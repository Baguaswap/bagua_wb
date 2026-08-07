// Static (non-animated) version of the octagon yin-yang mark used in the
// hero, sized down for use as a badge inside WalletConnectModal.
export default function BaguaBadge() {
  return (
    <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
      <div
        className="pointer-events-none absolute inset-[-14px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.35), transparent 70%)" }}
        aria-hidden="true"
      />

      {[45, 135, 225, 315].map((deg) => (
        <span
          key={deg}
          className="pointer-events-none absolute h-1.5 w-1.5 rotate-45 bg-accent-purple/70"
          style={{
            top: `${50 - 46 * Math.cos((deg * Math.PI) / 180)}%`,
            left: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
            transform: "translate(-50%, -50%) rotate(45deg)",
          }}
          aria-hidden="true"
        />
      ))}

      <svg
        viewBox="0 0 100 100"
        className="relative h-20 w-20 drop-shadow-[0_0_18px_rgba(245,179,36,0.4)]"
      >
        <polygon
          points="50,3 84,20 97,50 84,80 50,97 16,80 3,50 16,20"
          fill="#171123"
          stroke="#F5B324"
          strokeWidth="2.5"
        />
        <circle cx="50" cy="50" r="30" fill="#F5B324" />
        <path
          d="M50,20 A15,15 0 0,1 50,50 A15,15 0 0,0 50,80 A30,30 0 0,1 50,20 Z"
          fill="#E11D2E"
        />
        <circle cx="50" cy="35" r="4" fill="#F5B324" />
        <circle cx="50" cy="65" r="4" fill="#E11D2E" />
        <circle cx="50" cy="50" r="30" fill="none" stroke="#F5B324" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

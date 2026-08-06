export default function HeroLogo() {
  return (
    <div className="hero-parallax-logo animate-hero-float relative">
      {/* Outer rotating ring — decorative, orbits independently of the mark
          so the logo itself never spins out of legibility. */}
      <div
        className="animate-hero-ring-spin pointer-events-none absolute -inset-5 rounded-full"
        style={{
          border: "1px dashed rgba(245, 179, 36, 0.25)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.12) inset",
        }}
        aria-hidden="true"
      />

      {/* Energy ripple — two staggered rings pinging outward every few
          seconds for a continuous "alive" feel. */}
      <span
        className="hero-ripple-ring pointer-events-none absolute -inset-2 rounded-full border border-accent-gold/40"
        style={{ animationDelay: "0s" }}
        aria-hidden="true"
      />
      <span
        className="hero-ripple-ring pointer-events-none absolute -inset-2 rounded-full border border-accent-purple/40"
        style={{ animationDelay: "2.25s" }}
        aria-hidden="true"
      />

      {/* Gentle tilt wrapper — a slow, subtle rock rather than a full spin,
          so the mark stays readable at every frame. */}
      <div className="animate-hero-tilt">
        <svg
          viewBox="0 0 100 100"
          className="relative h-28 w-28 drop-shadow-[0_0_25px_rgba(245,179,36,0.35)] sm:h-32 sm:w-32"
        >
          <polygon
            points="50,3 84,20 97,50 84,80 50,97 16,80 3,50 16,20"
            fill="#171123"
            stroke="#F5B324"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#F5B324" strokeWidth="2" />
          <path d="M50 20a15 15 0 0 0 0 30 15 15 0 0 1 0 30 30 30 0 0 1 0-60Z" fill="#F5B324" />
          <circle cx="50" cy="35" r="3.2" fill="#171123" />
          <circle cx="50" cy="65" r="3.2" fill="#F5B324" />
        </svg>
      </div>
    </div>
  );
}

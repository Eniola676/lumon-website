// Hand-drawn, line-art SVG icons for the website-design service list —
// deliberately not stock illustrations or colored graphics, since those
// would clash with the site's monochrome, engineered-not-decorated look.
// Same stroke weight and currentColor convention as the lucide-react icons
// used everywhere else. Each has a small looping CSS animation (keyframes
// in globals.css) tied to what that specific service actually does, and
// respects prefers-reduced-motion via motion-reduce:animate-none.

type IconProps = { className?: string };

/** Custom Design & Build — a browser frame with content blocks that grow
 * in, left-aligned, staggered — like a page assembling itself. */
export function DesignBuildIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="14" r="1.4" fill="currentColor" />
      <circle cx="15" cy="14" r="1.4" fill="currentColor" />
      <circle cx="20" cy="14" r="1.4" fill="currentColor" />
      <line x1="4" y1="19" x2="44" y2="19" stroke="currentColor" strokeWidth="1.5" />
      <rect
        x="10"
        y="24"
        width="24"
        height="3"
        rx="1.5"
        fill="currentColor"
        className="origin-left animate-[build-grow_2.4s_ease-in-out_0s_infinite] motion-reduce:animate-none"
      />
      <rect
        x="10"
        y="30"
        width="18"
        height="3"
        rx="1.5"
        fill="currentColor"
        className="origin-left animate-[build-grow_2.4s_ease-in-out_0.25s_infinite] motion-reduce:animate-none"
      />
      <rect
        x="10"
        y="36"
        width="12"
        height="3"
        rx="1.5"
        fill="currentColor"
        className="origin-left animate-[build-grow_2.4s_ease-in-out_0.5s_infinite] motion-reduce:animate-none"
      />
    </svg>
  );
}

/** Local SEO, Built In — a map pin with radar rings pulsing outward from
 * it, like a location signal being broadcast. */
export function LocalSeoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle
        cx="24"
        cy="18"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ transformOrigin: "24px 18px" }}
        className="animate-[pulse-ring_2.4s_ease-out_0s_infinite] motion-reduce:animate-none"
      />
      <circle
        cx="24"
        cy="18"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ transformOrigin: "24px 18px" }}
        className="animate-[pulse-ring_2.4s_ease-out_1.2s_infinite] motion-reduce:animate-none"
      />
      <path
        d="M24 6c-6.6 0-12 5.4-12 12 0 9 12 24 12 24s12-15 12-24c0-6.6-5.4-12-12-12z"
        stroke="currentColor"
        strokeWidth="2"
        fill="white"
      />
      <circle cx="24" cy="18" r="4" fill="currentColor" />
    </svg>
  );
}

/** Lead Capture That Works — an envelope with a notification badge that
 * pops, like a new lead just came in. */
export function LeadCaptureIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="14" width="34" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="white" />
      <path d="M5 16l17 12 17-12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle
        cx="38"
        cy="12"
        r="5.5"
        fill="currentColor"
        style={{ transformOrigin: "38px 12px" }}
        className="animate-[notify-pop_1.8s_ease-in-out_infinite] motion-reduce:animate-none"
      />
    </svg>
  );
}

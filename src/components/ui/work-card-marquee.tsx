import type { WorkItem } from "@/components/ui/work-card";

const DURATION_MAP = {
  normal: "40s",
  slow: "60s",
  fast: "20s",
};

/**
 * Full-bleed infinite marquee of large work tiles — no Container, no
 * border, edge to edge. Same duplicate-and-translate technique as
 * MarqueeLogoScroller (shares its `marquee` keyframes in globals.css).
 *
 * A custom tile rather than the grid WorkCard component — that one is
 * built for a 3-column grid (fixed 270px image + a separate padded text
 * block below), whereas this is a single large photo with the caption
 * overlaid at the bottom, sized for a horizontal scroll strip.
 */
export function WorkCardMarquee({
  items,
  speed = "slow",
}: {
  items: WorkItem[];
  speed?: "normal" | "slow" | "fast";
}) {
  if (items.length === 0) return null;
  const animationDuration = DURATION_MAP[speed];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max gap-5 hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${animationDuration} linear infinite` }}
      >
        {[...items, ...items].map((item, index) => (
          <a
            key={`${item.href}-${index}`}
            href={item.href}
            className="group relative block h-48 w-72 shrink-0 overflow-hidden rounded-2xl sm:h-56 sm:w-80"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={`${item.title} — ${item.name}`}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-lg font-medium text-white">{item.name}</p>
              <p className="mt-1 line-clamp-1 text-sm text-white/70">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

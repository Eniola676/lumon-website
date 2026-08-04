import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Logo {
  // Either an image logo (src) or, when no reliable asset is available,
  // a styled text wordmark fallback (alt is used as the label either way).
  src?: string;
  alt: string;
  gradient: {
    from: string;
    via: string;
    to: string;
  };
}

interface MarqueeLogoScrollerProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  logos: Logo[];
  speed?: "normal" | "slow" | "fast";
}

const DURATION_MAP = {
  normal: "40s",
  slow: "80s",
  fast: "5s",
};

/**
 * Self-contained infinite logo marquee. Pauses on hover, logos are
 * grayscale by default and reveal brand color + gradient backdrop on
 * hover — keeps the strip on-palette (monochrome) at rest.
 */
export function MarqueeLogoScroller({
  title,
  description,
  logos,
  speed = "normal",
  className,
  ...props
}: MarqueeLogoScrollerProps) {
  const animationDuration = DURATION_MAP[speed];

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-[#e9e9ea] bg-white",
        className
      )}
      {...props}
    >
      {(title || description) && (
        <div className="grid grid-cols-1 gap-4 border-b border-[#e9e9ea] p-6 sm:p-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
          {title && (
            <h2 className="text-2xl leading-tight font-normal tracking-tight sm:text-3xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-gray-600 lg:self-start lg:justify-self-end">
              {description}
            </p>
          )}
        </div>
      )}

      <div
        className="w-full overflow-hidden py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div
          className="flex w-max items-center gap-4 hover:[animation-play-state:paused]"
          style={{ animation: `marquee ${animationDuration} linear infinite` }}
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="group relative flex h-20 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#fbfbfb]"
            >
              <div
                style={
                  {
                    "--from": logo.gradient.from,
                    "--via": logo.gradient.via,
                    "--to": logo.gradient.to,
                  } as React.CSSProperties
                }
                className="absolute inset-0 scale-150 bg-gradient-to-br from-[var(--from)] via-[var(--via)] to-[var(--to)] opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-15"
              />
              {logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="relative h-8 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              ) : (
                <span className="relative text-lg font-semibold tracking-tight text-gray-400 transition-colors duration-300 group-hover:text-black">
                  {logo.alt}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

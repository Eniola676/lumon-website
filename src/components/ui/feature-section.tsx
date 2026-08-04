import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import type { FeatureSectionContent, FeatureTile } from "@/lib/feature-sections";

function Tile({ tile, className }: { tile: FeatureTile; className?: string }) {
  const Icon = tile.icon;
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#e9e9ea] bg-[#fbfbfb] p-6 sm:p-8",
        className
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full border border-[#e9e9ea] bg-white">
        <Icon className="size-4.5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 text-lg font-medium sm:text-xl">{tile.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{tile.body}</p>
    </div>
  );
}

export function FeatureSection({
  eyebrow,
  headline,
  subhead,
  tiles,
  ctaHeadline,
  ctaSubhead,
  ctaButtonLabel,
}: FeatureSectionContent) {
  const [t1, t2, t3, t4, t5] = tiles;

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-24">
        <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
          {headline}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          {subhead}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-6">
          <Tile tile={t1} className="lg:col-span-2" />
          <Tile tile={t2} className="lg:col-span-2" />
          <Tile tile={t3} className="lg:col-span-2" />
          <Tile tile={t4} className="lg:col-span-3" />
          <Tile tile={t5} className="lg:col-span-3" />
        </div>

        <div className="mt-4 rounded-3xl bg-[#070707] p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-normal tracking-tight text-white sm:text-3xl">
                {ctaHeadline}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                {ctaSubhead}
              </p>
            </div>
            <CalendlyButton variant="primary-invert" className="shrink-0">
              {ctaButtonLabel}
            </CalendlyButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

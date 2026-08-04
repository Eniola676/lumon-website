import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function StatBand({
  heading,
  description,
  stats,
}: {
  heading: ReactNode;
  description: ReactNode;
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="bg-[#070707] text-white">
      <Container className="grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
          {heading}
        </h2>
        <div>
          <div className="text-base leading-relaxed text-white/60 sm:text-lg">
            {description}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-normal sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-xs tracking-wide text-white/40 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

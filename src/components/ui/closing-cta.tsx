import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";

export function ClosingCta({
  children,
  buttonLabel,
  dark = false,
}: {
  children: ReactNode;
  buttonLabel: string;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-[#070707] text-white" : "bg-[#fbfbfb]"}>
      <Container className="flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center sm:py-20">
        <h2 className="max-w-xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
          {children}
        </h2>
        <CalendlyButton
          variant={dark ? "primary-invert" : "outline"}
          className="shrink-0"
        >
          {buttonLabel}
        </CalendlyButton>
      </Container>
    </section>
  );
}

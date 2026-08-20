import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { TextReviewCard } from "@/components/ui/review-cards";
import { TEXT_REVIEWS } from "@/lib/reviews";
import { LAUNCH_CTA_COPY } from "@/lib/course-price-calculator/constants";

const PROOF_REVIEWS = TEXT_REVIEWS.slice(0, 2);

export function LaunchCta() {
  return (
    <section className="bg-[#070707] text-white">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs tracking-wide text-white/50 uppercase">
            {LAUNCH_CTA_COPY.eyebrow}
          </p>
          <h2 className="mt-3 max-w-xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
            {LAUNCH_CTA_COPY.headline}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {LAUNCH_CTA_COPY.body}
          </p>

          <div className="mt-8">
            <CalendlyButton variant="primary-invert">{LAUNCH_CTA_COPY.buttonLabel}</CalendlyButton>
            <p className="mt-3 text-sm text-white/40">{LAUNCH_CTA_COPY.buttonSubtext}</p>
          </div>
        </div>

        <div>
          {PROOF_REVIEWS.map((review) => (
            <TextReviewCard key={review.name} {...review} />
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { NumberedList } from "@/components/ui/numbered-list";
import { Checklist } from "@/components/ui/checklist";
import { PriceCard } from "@/components/ui/price-card";
import { AddOnsBento } from "@/components/ui/addons-bento";
import { PortfolioPanel } from "@/components/ui/portfolio-panel";
import { WorkCard } from "@/components/ui/work-card";
import { KineticGrid } from "@/components/ui/kinetic-grid";
import { FeatureSection } from "@/components/ui/feature-section";
import { Faq } from "@/components/ui/faq";
import { ClosingCta } from "@/components/ui/closing-cta";
import { TestimonialWall } from "@/components/testimonial-wall";
import type { OfferContent } from "@/lib/offers";
import type { Client } from "@/lib/clients";
import type { FeatureSectionContent } from "@/lib/feature-sections";

export function OfferPage({
  offer,
  showTestimonialWall = false,
  caseStudyClients,
  featureSection,
}: {
  offer: OfferContent;
  showTestimonialWall?: boolean;
  caseStudyClients?: Client[];
  featureSection?: FeatureSectionContent;
}) {
  return (
    <>
      {/* Hero */}
      <KineticGrid className="text-white">
        <Container className="pt-36 pb-20 sm:pt-44 sm:pb-28">
          <p className="font-mono text-xs tracking-wide text-white/50 uppercase">
            {offer.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl">
            {offer.heroHeadline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {offer.heroSub}
          </p>
          <p className="mt-8 font-mono text-sm tracking-wide text-white/70">
            {offer.heroAnchors}
          </p>
          <div className="mt-8">
            <CalendlyButton variant="primary-invert">
              {offer.heroCtaLabel}
            </CalendlyButton>
          </div>
        </Container>
      </KineticGrid>

      {/* Who it's for */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
                {offer.whoHeading}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                {offer.whoIntro}
              </p>
            </div>
            <Checklist items={offer.whoBullets} />
          </div>
        </Container>
      </section>

      {featureSection && <FeatureSection {...featureSection} />}

      {/* Included */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
            {offer.includedHeading}
          </h2>
          <div className="mt-10">
            <NumberedList items={offer.includedItems} />
          </div>
        </Container>
      </section>

      {/* Secondary (Enterprise: standard scope) */}
      {offer.secondaryItems && (
        <section className="bg-white">
          <Container className="py-16 sm:py-24">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
                  {offer.secondaryHeading}
                </h2>
                <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                  {offer.secondaryIntro}
                </p>
              </div>
              <Checklist items={offer.secondaryItems} />
            </div>
          </Container>
        </section>
      )}

      {/* Timeline */}
      {offer.timelineItems && (
        <section className="bg-white">
          <Container className="py-16 sm:py-24">
            <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
              {offer.timelineHeading}
            </h2>
            <div className="mt-10">
              <NumberedList items={offer.timelineItems} />
            </div>
          </Container>
        </section>
      )}

      {/* Pricing */}
      {offer.price && offer.priceTerms && (
        <section className="bg-[#fbfbfb]">
          <Container className="py-16 sm:py-24">
            <PriceCard price={offer.price} terms={offer.priceTerms} />
            {offer.addOns && (
              <div className="mt-12">
                <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                  Add-ons.
                </h3>
                <div className="mt-6">
                  <AddOnsBento items={offer.addOns} />
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Proof */}
      {offer.proofItems && (
        <section className="bg-white">
          <Container className="py-16 sm:py-24">
            <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
              {offer.proofLead}{" "}
              <em className="italic">{offer.proofEmphasis}</em>
            </h2>
            <div className="mt-10">
              {caseStudyClients ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {caseStudyClients.map((client) => (
                    <WorkCard key={client.name} {...client} />
                  ))}
                </div>
              ) : (
                <PortfolioPanel items={offer.proofItems} />
              )}
            </div>
          </Container>
        </section>
      )}

      {showTestimonialWall && <TestimonialWall />}

      {/* FAQ */}
      <section className="border-t border-[#e9e9ea] bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
              Common <em className="italic">questions.</em>
            </h2>
            <Faq items={offer.faqItems} />
          </div>
        </Container>
      </section>

      <ClosingCta dark buttonLabel={offer.closingCtaLabel}>
        {offer.closingLead}{" "}
        <em className="italic">{offer.closingEmphasis}</em>
      </ClosingCta>
    </>
  );
}

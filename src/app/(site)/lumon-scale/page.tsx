import type { Metadata } from "next";
import { OfferPage } from "@/components/offer-page";
import { OFFERS } from "@/lib/offers";
import { CASE_STUDY_CLIENTS } from "@/lib/clients";
import { getCaseStudiesByOffer, caseStudyToWorkItem } from "@/lib/case-studies";
import { SCALE_FEATURES } from "@/lib/feature-sections";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lumon Scale — Lumon Studios",
  description:
    "A premium website rebuild + full course system integration for established coaches doing $10k+/month. CRM, pipelines, and automation — in 6 weeks with zero downtime. From $7,500.",
  alternates: { canonical: "/lumon-scale" },
};

export default async function ScalePage() {
  const caseStudies = await getCaseStudiesByOffer("scale");
  const proofWorkItems =
    caseStudies.length > 0 ? caseStudies.map(caseStudyToWorkItem) : [CASE_STUDY_CLIENTS[2]];

  return (
    <OfferPage
      offer={OFFERS.scale}
      showTestimonialWall
      proofWorkItems={proofWorkItems}
      featureSection={SCALE_FEATURES}
    />
  );
}

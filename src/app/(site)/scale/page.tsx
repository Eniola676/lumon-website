import type { Metadata } from "next";
import { OfferPage } from "@/components/offer-page";
import { OFFERS } from "@/lib/offers";
import { CASE_STUDY_CLIENTS } from "@/lib/clients";
import { SCALE_FEATURES } from "@/lib/feature-sections";

export const metadata: Metadata = {
  title: "Lumon Scale — Lumon Studios",
  description:
    "Rebuild your coaching business's tech stack — CRM, pipelines, automation, and website — in 6 weeks with zero downtime. For coaches doing $10k+/month. From $6,500.",
  alternates: { canonical: "/scale" },
};

export default function ScalePage() {
  return (
    <OfferPage
      offer={OFFERS.scale}
      showTestimonialWall
      caseStudyClients={[CASE_STUDY_CLIENTS[2]]}
      featureSection={SCALE_FEATURES}
    />
  );
}

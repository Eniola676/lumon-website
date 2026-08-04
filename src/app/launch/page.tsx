import type { Metadata } from "next";
import { OfferPage } from "@/components/offer-page";
import { OFFERS } from "@/lib/offers";
import { CASE_STUDY_CLIENTS } from "@/lib/clients";
import { LAUNCH_FEATURES } from "@/lib/feature-sections";

export const metadata: Metadata = {
  title: "Lumon Launch — Lumon Studios",
  description:
    "Everything you need to sell your first course — built in 14 days. From $1,500.",
};

export default function LaunchPage() {
  return (
    <OfferPage
      offer={OFFERS.launch}
      showTestimonialWall
      caseStudyClients={[CASE_STUDY_CLIENTS[0], CASE_STUDY_CLIENTS[1]]}
      featureSection={LAUNCH_FEATURES}
    />
  );
}

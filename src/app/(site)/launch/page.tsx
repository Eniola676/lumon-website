import type { Metadata } from "next";
import { OfferPage } from "@/components/offer-page";
import { OFFERS } from "@/lib/offers";
import { CASE_STUDY_CLIENTS } from "@/lib/clients";
import { LAUNCH_FEATURES } from "@/lib/feature-sections";

export const metadata: Metadata = {
  title: "Lumon Launch — Lumon Studios",
  description:
    "A professional website + course launch system for experts launching their first paid program. Course site, payment infrastructure, and email automation — live in 14 days. From $2,500.",
  alternates: { canonical: "/launch" },
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

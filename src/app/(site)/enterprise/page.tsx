import type { Metadata } from "next";
import { OfferPage } from "@/components/offer-page";
import { OFFERS } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Lumon Enterprise — Lumon Studios",
  description:
    "Whitelabel course systems and learning platforms — built under your brand. Projects from $8,000.",
  alternates: { canonical: "/enterprise" },
};

export default function EnterprisePage() {
  return <OfferPage offer={OFFERS.enterprise} />;
}

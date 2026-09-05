import type { Metadata } from "next";
import { OfferPage } from "@/components/offer-page";
import { OFFERS } from "@/lib/offers";

export const metadata: Metadata = {
  title: "Lumon Enterprise — Lumon Studios",
  description:
    "Whitelabel learning platforms and course systems for agencies, HR/L&D consultancies, SaaS teams, and CE providers — built under your brand, NDA-protected. Projects from $10,000.",
  alternates: { canonical: "/enterprise" },
};

export default function EnterprisePage() {
  return <OfferPage offer={OFFERS.enterprise} />;
}

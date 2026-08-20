import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy — Lumon Studios",
  description:
    "How Lumon Studios collects and uses visitor data on lumonstudio.xyz.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-white">
        <Container className="pt-36 pb-20 sm:pt-44 sm:pb-28">
          <h1 className="max-w-2xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl">
            Privacy <em className="italic">Policy.</em>
          </h1>
        </Container>
      </section>

      {/* Policy body */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            <p>
              Lumon Studios (lumonstudio.xyz) collects visitor data to
              analyze traffic on our website. This information helps us
              gauge client interests, and improve our website. When you
              visit our website, a short text file called a cookie might be
              downloaded to your computer or device. This information is
              collected for traffic analysis only, and does not contain
              personal details. Depending on the browser that you use, you
              can set your preferences to block/refuse cookies, and/or
              notify you before they are placed. Lumon Studios
              (lumonstudio.xyz) does not sell, give, or trade their
              statistics to any third parties for data-mining or marketing
              purposes.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

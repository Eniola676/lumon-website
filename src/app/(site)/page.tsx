import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { NumberedList } from "@/components/ui/numbered-list";
import { Checklist } from "@/components/ui/checklist";
import { WorkCard } from "@/components/ui/work-card";
import { ClosingCta } from "@/components/ui/closing-cta";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import { AiSummaryLinks } from "@/components/ui/ai-summary-links";
import { BlogSection } from "@/components/ui/blog-section";
import { FeatureSection } from "@/components/ui/feature-section";
import { TestimonialWall } from "@/components/testimonial-wall";
import { PLATFORM_LOGOS } from "@/lib/platform-logos";
import { CLIENTS } from "@/lib/clients";
import { HOME_FEATURES } from "@/lib/feature-sections";

export const metadata: Metadata = {
  title: "Lumon Studios — Course systems for coaches who mean business.",
  description:
    "Custom-built platforms, funnels, and websites for coaches, consultants, and training organisations. No templates. No handoffs. Just work that quietly does its job.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#3d7cc9] text-white">
        {/*
          TODO: swap this placeholder for the real sky/clouds background image.
          Drop the file in /public (e.g. /public/hero-sky.jpg) and replace
          everything in this comment block's sibling divs with a single:
          <div className="absolute inset-0 bg-[url('/hero-sky.jpg')] bg-cover bg-center" />
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a8ad9] via-[#6ba3e0] to-[#a9c9ec]" />
        {/* soft cloud blobs */}
        <div className="absolute top-[8%] left-[8%] h-56 w-96 rounded-full bg-white/80 blur-3xl" />
        <div className="absolute top-[20%] right-[10%] h-40 w-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute bottom-[15%] left-[20%] h-48 w-[28rem] rounded-full bg-white/50 blur-3xl" />
        <div className="absolute right-[20%] bottom-[5%] h-32 w-64 rounded-full bg-white/40 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <Container className="relative pt-36 pb-32 text-center sm:pt-44 sm:pb-40 lg:pt-52 lg:pb-48">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 backdrop-blur-sm">
              <AiSummaryLinks />
            </div>
          </div>

          <h1 className="mx-auto mt-8 max-w-3xl text-4xl leading-[1.1] font-black tracking-tight uppercase sm:max-w-3xl sm:text-5xl lg:max-w-5xl lg:text-6xl">
            we build the machine that makes your coaching business run.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            The infrastructure behind coaching businesses that actually make money.
          </p>
          <div className="mt-10 flex justify-center">
            <CalendlyButton variant="primary-invert">
              Book a Discovery Call
            </CalendlyButton>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <section className="bg-white">
        <Container className="py-12">
          <MarqueeLogoScroller
            title="Platforms we build on."
            logos={PLATFORM_LOGOS}
            speed="slow"
          />
        </Container>
      </section>

      {/* What we do */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
            Three ways <em className="italic">we work.</em>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Everything Lumon Studios builds falls into three programs — each
            for a different stage of your business.
          </p>
          <div className="mt-10">
            <NumberedList
              items={[
                {
                  title: "Lumon Launch",
                  meta: "From $1,500",
                  description:
                    "For coaches launching their first course. Everything you need to sell — in 14 days.",
                  href: "/launch",
                },
                {
                  title: "Lumon Scale",
                  meta: "From $6,500",
                  description:
                    "For established coaches at $10k+/month. Consolidate your tools into one clean system — in 6 weeks.",
                  href: "/scale",
                },
                {
                  title: "Lumon Enterprise",
                  meta: "From $8,000 per project",
                  description:
                    "Whitelabel builds for HR firms, L&D consultancies, and agencies. Your brand. Your credit.",
                  href: "/enterprise",
                },
              ]}
            />
          </div>
        </Container>
      </section>

      <FeatureSection {...HOME_FEATURES} />

      {/* The problem */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
              Coaches lose more revenue to broken tech{" "}
              <em className="italic">than to bad marketing.</em>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Half-built course sites. Payments that don&rsquo;t route.
              Automations that half-fire. Fifteen tools duct-taped together
              that only your VA half-understands. Every one of these leaks
              revenue, and none of them are why you started coaching.
            </p>
            <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
              Lumon Studios exists to fix the system so the business runs on
              rails — and you go back to being the expert, not the tech
              support.
            </p>
          </div>
        </Container>
      </section>

      {/* Proof */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
            Work we&rsquo;ve <em className="italic">built.</em>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Sixty-plus projects. Coaches, consultants, and organisations
            across the US, UK, and beyond.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENTS.map((client) => (
              <WorkCard key={client.name} {...client} />
            ))}
          </div>
        </Container>
      </section>

      <TestimonialWall />

      {/* Who we work with */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
                The right fit for <em className="italic">Lumon Studios.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Coaches, consultants, and training organisations who take
                their business seriously — and want the tech to match. If any
                of this describes you, we should talk:
              </p>
            </div>
            <Checklist
              items={[
                "You have expertise worth teaching and want to package it into a course that actually sells.",
                "Your business has grown past the point where duct tape and Zapier can hold it together.",
                "You run an agency or firm that delivers training solutions to your own clients and need a partner behind the scenes.",
              ]}
            />
          </div>
        </Container>
      </section>

      <BlogSection />

      <ClosingCta dark buttonLabel="Book a Discovery Call">
        Ready to build something that <em className="italic">actually works?</em>
      </ClosingCta>
    </>
  );
}

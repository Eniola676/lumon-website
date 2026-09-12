import type { Metadata } from "next";
import Link from "next/link";
import { X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { NumberedList } from "@/components/ui/numbered-list";
import { Checklist } from "@/components/ui/checklist";
import { WorkCardMarquee } from "@/components/ui/work-card-marquee";
import { ClosingCta } from "@/components/ui/closing-cta";
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller";
import { AiSummaryLinks } from "@/components/ui/ai-summary-links";
import { BlogSection } from "@/components/ui/blog-section";
import { FeatureSection } from "@/components/ui/feature-section";
import { Stars } from "@/components/ui/stars";
import { TestimonialWall } from "@/components/testimonial-wall";
import { PLATFORM_LOGOS } from "@/lib/platform-logos";
import { CLIENTS } from "@/lib/clients";
import { getFeaturedCaseStudies, caseStudyToWorkItem } from "@/lib/case-studies";
import { HOME_FEATURES } from "@/lib/feature-sections";

const FAILURE_LIST = [
  "Six months comparing Kajabi, Thinkific, Teachable, and Podia",
  "Videos recorded, sitting in a Drive folder, no structure around them",
  "Launching without a proven, scalable system for acquiring students",
  "Email automations built in three tools that don't talk to each other",
  "Platform-hopped twice after getting stuck, started over both times",
  "An audience that asked twice and stopped asking",
];

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Lumon Studios — Course systems for coaches who mean business.",
  description:
    "Custom-built platforms, funnels, and websites for coaches, consultants, and training organisations. No templates. No handoffs. Just work that quietly does its job.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const caseStudies = await getFeaturedCaseStudies();
  const workItems = caseStudies.length > 0 ? caseStudies.map(caseStudyToWorkItem) : CLIENTS;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col overflow-hidden bg-[#3d7cc9] text-white sm:min-h-[95vh]">
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

        <Container className="relative flex flex-1 flex-col items-center justify-center pt-20 pb-4 text-center sm:pt-28 sm:pb-6">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm sm:px-5 sm:py-2.5">
              <AiSummaryLinks />
            </div>
          </div>

          <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.1] font-black tracking-tight uppercase sm:mt-6 sm:max-w-3xl sm:text-5xl lg:max-w-5xl lg:text-6xl">
            Monetize Your Expertise with a Premium Website & Course
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            The infrastructure behind coaching businesses that actually make money.
          </p>
          <div className="mt-5 flex flex-col items-center gap-2 sm:mt-8 sm:gap-3">
            <CalendlyButton variant="primary-invert">
              Book a Discovery Call
            </CalendlyButton>
            <a
              href="https://www.fiverr.com/toby_techy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/85 transition-colors hover:text-white"
            >
              <Stars count={5} className="text-white" />
              <span className="underline underline-offset-2">5.0 rated on Fiverr</span>
            </a>
          </div>
        </Container>

        {/* Work we've built — full-width marquee, pinned to the bottom of the hero */}
        <div className="relative shrink-0 pb-4 sm:pb-8">
          <p className="mb-2 text-center font-mono text-xs tracking-wide text-white/60 uppercase sm:mb-3">
            Work we&rsquo;ve built
          </p>
          <WorkCardMarquee items={workItems} />
        </div>
      </section>

      {/* The problem */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
                The actual first step is never{" "}
                <em className="italic">building the course itself.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Most courses stall out long before the final edit. The real
                failure happens earlier, when creators focus on producing
                content prior to validating their target buyer, core
                promise, price point, and launch strategy. Typically, the
                cycle unfolds like this:
              </p>
              <div className="mt-8 border-l-2 border-black pl-6">
                <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
                  My view
                </p>
                <p className="mt-3 text-base leading-relaxed text-gray-800 sm:text-lg">
                  Most coaches don&rsquo;t need six months of strategy before
                  they build. Expertise is real. The risk is spending months
                  producing a product before a single buyer has proven they
                  want it. Start with proof. Build what sells. Operate what
                  works.
                </p>
              </div>
            </div>
            <ul className="space-y-4">
              {FAILURE_LIST.map((item) => (
                <li key={item} className="flex gap-4 text-base leading-relaxed sm:text-lg">
                  <X className="mt-1 size-4 shrink-0 text-gray-400" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
                  meta: "From $2,500",
                  description:
                    "A professional website + course launch system, for experts launching their first paid program — in 14 days.",
                  href: "/launch",
                },
                {
                  title: "Lumon Scale",
                  meta: "From $7,500",
                  description:
                    "A premium website rebuild + full course system integration, for established coaches at $10k+/month — in 6 weeks.",
                  href: "/scale",
                },
                {
                  title: "Lumon Enterprise",
                  meta: "From $10,000 per project",
                  description:
                    "Whitelabel builds for HR firms, L&D consultancies, and agencies. Your brand. Your credit.",
                  href: "/enterprise",
                },
              ]}
            />
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Not sure what your own course should cost?{" "}
            <Link href="/tools/online-course-price-calculator" className="underline underline-offset-4 hover:text-black">
              Try the free pricing calculator
            </Link>
            .
          </p>
        </Container>
      </section>

      <FeatureSection {...HOME_FEATURES} />

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

      <section className="bg-[#070707] pb-16 text-center">
        <Container>
          <p className="text-sm text-white/40">
            Prefer to write first?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-white">
              Send us a message
            </Link>{" "}
            instead.
          </p>
        </Container>
      </section>
    </>
  );
}

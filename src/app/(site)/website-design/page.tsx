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
import { WEBSITE_DESIGN_FEATURES } from "@/lib/feature-sections";

// Same page as the homepage, section for section — just not aimed at any
// one niche. The homepage speaks to coaches specifically; this is the
// general "website design & development for local and small businesses"
// version for traffic that isn't coaching-specific (local SEO, ads, direct
// referrals for plain web work).
const FAILURE_LIST = [
  "Months comparing Wix, Squarespace, and GoDaddy templates",
  "A logo and a color palette, no strategy behind either",
  "A site that looks fine on desktop and breaks on mobile",
  "No way to tell which page actually brings in calls or bookings",
  "A contact form that goes straight to a folder nobody checks",
  "Customers searching nearby find a competitor instead, because nothing was set up for local search",
];

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Website Design & Development — Lumon Studios",
  description:
    "Custom website design and development for local and small businesses. No templates, no niche restrictions — just a site built to get you found and get you chosen.",
  alternates: { canonical: "/website-design" },
};

export default async function WebsiteDesignPage() {
  const caseStudies = await getFeaturedCaseStudies();
  const workItems = caseStudies.length > 0 ? caseStudies.map(caseStudyToWorkItem) : CLIENTS;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] flex-col overflow-hidden bg-[#3d7cc9] text-white sm:min-h-[95vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4a8ad9] via-[#6ba3e0] to-[#a9c9ec]" />
        {/* soft cloud blobs */}
        <div className="absolute top-[8%] left-[8%] h-56 w-96 rounded-full bg-white/80 blur-3xl" />
        <div className="absolute top-[20%] right-[10%] h-40 w-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute bottom-[15%] left-[20%] h-48 w-[28rem] rounded-full bg-white/50 blur-3xl" />
        <div className="absolute right-[20%] bottom-[5%] h-32 w-64 rounded-full bg-white/40 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        <Container className="relative flex flex-1 flex-col items-center justify-center pt-20 pb-4 text-center sm:pt-28 sm:pb-6">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-sm sm:px-5 sm:py-2.5">
              <AiSummaryLinks />
            </div>
          </div>

          <h1 className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.1] font-black tracking-tight uppercase sm:mt-6 sm:max-w-3xl sm:text-5xl lg:max-w-5xl lg:text-6xl">
            Websites That Get Local Businesses Chosen First
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
            The infrastructure behind small businesses that actually make money.
          </p>
          <div className="mt-5 flex flex-col items-center gap-2 sm:mt-8 sm:gap-3">
            <CalendlyButton variant="primary-invert">
              Yes! Let&rsquo;s build my website
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
                <em className="italic">picking a template.</em>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
                Most small-business websites stall out long before launch —
                or worse, launch and change nothing. The real failure happens
                earlier, when owners jump straight to a website builder
                before deciding who the site is actually for, what makes
                them the better choice, and how someone finds them in the
                first place. Typically, the cycle unfolds like this:
              </p>
              <div className="mt-8 border-l-2 border-black pl-6">
                <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
                  My view
                </p>
                <p className="mt-3 text-base leading-relaxed text-gray-800 sm:text-lg">
                  Most small business owners don&rsquo;t need six months of
                  branding exercises before they build. What you do is real.
                  The risk is spending months on a logo and color palette
                  before a single customer has proven the site actually gets
                  them to call. Start with proof. Build what gets chosen.
                  Operate what works.
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
            What actually gets <em className="italic">built.</em>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Every website design and development project includes the pieces
            that turn visitors into customers.
          </p>
          <div className="mt-10">
            <NumberedList
              items={[
                {
                  title: "Custom Design & Build",
                  description:
                    "A site designed around your actual business — not a template with your logo swapped in. Mobile-first, fast, and built on the platform that fits: Webflow, WordPress, Squarespace, or custom.",
                },
                {
                  title: "Local SEO, Built In",
                  description:
                    "Google Business Profile connected, local keywords in place, structured data search engines can actually read. When someone nearby searches for what you do, you show up.",
                },
                {
                  title: "Lead Capture That Works",
                  description:
                    "Contact forms that notify you immediately, click-to-call buttons that work on mobile, booking or quote-request flows — whatever gets a visitor to actually reach out.",
                },
              ]}
            />
          </div>
          <p className="mt-8 text-sm text-gray-500">
            Not sure what your project should cost?{" "}
            <Link href="/contact-us" className="underline underline-offset-4 hover:text-black">
              Let&rsquo;s talk about your business
            </Link>
            .
          </p>
        </Container>
      </section>

      <FeatureSection {...WEBSITE_DESIGN_FEATURES} />

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
                Local and small businesses who take their business seriously
                — and want a website that matches. If any of this describes
                you, we should talk:
              </p>
            </div>
            <Checklist
              items={[
                "You run a real business — a shop, a practice, a service, a studio — and your website doesn't reflect it.",
                "You're tired of a DIY builder site that looks like everyone else's.",
                "You want a site that actually brings in calls, bookings, or walk-ins — not just something to point people to.",
              ]}
            />
          </div>
        </Container>
      </section>

      <BlogSection />

      <ClosingCta dark buttonLabel="Yes! Let's build my website">
        Ready to build something that <em className="italic">actually gets you chosen?</em>
      </ClosingCta>

      <section className="bg-[#070707] pb-16 text-center">
        <Container>
          <p className="text-sm text-white/40">
            Prefer to write first?{" "}
            <Link href="/contact-us" className="underline underline-offset-4 hover:text-white">
              Send us a message
            </Link>{" "}
            instead.
          </p>
        </Container>
      </section>
    </>
  );
}

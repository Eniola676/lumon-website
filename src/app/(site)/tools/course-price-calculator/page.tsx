import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Faq } from "@/components/ui/faq";
import { CoursePriceCalculator } from "@/components/course-price-calculator/calculator";
import { LaunchCta } from "@/components/course-price-calculator/launch-cta";
import { FORMAT_OPTIONS, CATEGORY_OPTIONS } from "@/lib/course-price-calculator/constants";
import { formatUSD } from "@/lib/course-price-calculator/logic";
import { SITE_URL } from "@/lib/site";

const PATH = "/tools/course-price-calculator";
const PAGE_URL = `${SITE_URL}${PATH}`;

export const metadata: Metadata = {
  title: "Online Course Price Calculator — Find Out What to Charge (Free Tool) | Lumon Studios",
  description:
    "Free online course price calculator. Answer a few quick questions and get a data-backed price range for your first course, plus the plan to launch it.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Online Course Price Calculator — Find Out What to Charge",
    description:
      "Answer a few quick questions and get a data-backed price range for your first course.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Course Price Calculator — Find Out What to Charge",
    description:
      "Answer a few quick questions and get a data-backed price range for your first course.",
  },
};

const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "How much should I charge for my first online course?",
    a: "It depends on your format, your proof, and what the student walks away with. A 2-hour mini-course rarely holds a price above $97, while a certification program with 1:1 coaching can justify $2,000+. Run the calculator above for a range built from your specific inputs, not a flat industry average.",
  },
  {
    q: "Is this course pricing calculator actually free?",
    a: "Yes. The price range shows before you enter an email — nothing is gated behind a form. If you want the implementation roadmap that goes with your price point, you can enter your email afterward, but it's optional.",
  },
  {
    q: "How is the price calculated — is it AI?",
    a: "No AI. It's a rule-based model built from three anchors: a market band for your format and category, a proof score based on your experience and audience, and a value ceiling based on what the student actually gets. The same logic runs every time — there's no black box.",
  },
  {
    q: "Should I sell on Udemy or my own site?",
    a: "Marketplaces like Udemy run near-permanent discount cycles, so real transaction prices land under $200 regardless of your list price. If your calculated range is higher than that, you'll only capture it by selling from your own site.",
  },
  {
    q: "What if I don't have an audience yet?",
    a: "You can still price accordingly — audience size is one input among several, not a hard requirement. A strong outcome and clear proof can support a solid price even at zero followers; the calculator will just position you lower in the band until you've got more social proof.",
  },
  {
    q: "Can I change my price after I launch?",
    a: "Yes, and you should expect to. Treat the calculator's range as your starting price, not a permanent one. If fewer than 1 in 100 visitors buy, test a lower price; if more than 1 in 20 buy, you're underpriced — raise it.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Lumon Studios",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [
      "https://www.linkedin.com/company/lumon-studio/",
      "https://www.instagram.com/lumonweb",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Online Course Price Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: PAGE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  },
];

export default function CoursePriceCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero + calculator */}
      <section className="bg-white">
        <Container className="pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">Free tool</p>
            <h1 className="mt-3 text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl">
              Online Course Price Calculator
            </h1>
            <p className="mt-6 text-base leading-relaxed text-gray-600 sm:text-lg">
              Answer 8 quick questions. Get an accurate, data-backed price
              for your course — no email required to see it.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl">
            <CoursePriceCalculator />
          </div>
        </Container>
      </section>

      {/* Why prices vary so much */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
              How much should you{" "}
              <em className="italic">charge for an online course?</em>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              <p>
                Search “how much to charge for an online course” and you’ll
                find a dozen contradictory answers — $47, $497, $4,997, each
                argued with total confidence. The truth is a fair price
                depends on three things: what format you’re selling, how
                much proof you already have, and how valuable the outcome is
                to the person buying it. That’s exactly what the calculator
                above prices for.
              </p>
              <p>
                This course pricing calculator is rule-based, not AI-based —
                every number is computed live in your browser from the same
                three anchors, so the logic behind your range is never a
                mystery.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Benchmarks table */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
            Online course pricing <em className="italic">benchmarks (2026).</em>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Starting ranges by format, before category and access multipliers
            are applied. The calculator above adjusts these for your specific
            course.
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e9e9ea]">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
              <caption className="sr-only">
                Base online course price ranges by format
              </caption>
              <thead>
                <tr className="border-b border-[#e9e9ea] bg-[#fbfbfb]">
                  <th scope="col" className="px-5 py-4 font-medium">
                    Format
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Base range (USD)
                  </th>
                </tr>
              </thead>
              <tbody>
                {FORMAT_OPTIONS.map((format) => (
                  <tr key={format.id} className="border-b border-[#e9e9ea] last:border-0">
                    <td className="px-5 py-4">
                      <span className="font-medium">{format.label}</span>{" "}
                      <span className="text-gray-500">({format.sublabel})</span>
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      {formatUSD(format.baseMin)} – {formatUSD(format.baseMax)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#e9e9ea]">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
              <caption className="sr-only">Category price multipliers</caption>
              <thead>
                <tr className="border-b border-[#e9e9ea] bg-[#fbfbfb]">
                  <th scope="col" className="px-5 py-4 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-5 py-4 font-medium">
                    Multiplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {CATEGORY_OPTIONS.map((category) => (
                  <tr key={category.id} className="border-b border-[#e9e9ea] last:border-0">
                    <td className="px-5 py-4">{category.label}</td>
                    <td className="px-5 py-4 text-gray-700">×{category.multiplier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* How to price your first course */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
              How to price your <em className="italic">first online course.</em>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              <p>
                If you’ve typed “price my first online course” into Google at
                1am, you already know the range is huge. Most first-time
                creators default to one of two mistakes: pricing at $27
                because it feels safe, or pricing at $997 because a guru said
                to. Neither is grounded in anything specific to your course.
              </p>
              <p>
                A better starting point: price the format and access level
                honestly, then check that price against what the result is
                actually worth to the student. If a $500 course gets someone
                a $10,000 raise, $500 is cheap. If a $500 course teaches a
                hobby with no financial upside, $500 needs real proof behind
                it to hold.
              </p>
              <p>
                Once you have a number, the harder part is everything around
                it — the platform, the payment flow, the emails that turn
                interest into a sale.{" "}
                <Link href="/launch" className="underline underline-offset-4 hover:text-black">
                  Lumon Launch
                </Link>{" "}
                builds that system in 14 days. If you’re past your first
                launch and scaling what already works,{" "}
                <Link href="/lumon-scale" className="underline underline-offset-4 hover:text-black">
                  Lumon Scale
                </Link>{" "}
                is the next step.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
              FAQ
            </h2>
            <div className="mt-8">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </Container>
      </section>

      <LaunchCta />
    </>
  );
}

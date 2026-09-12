import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NumberedList } from "@/components/ui/numbered-list";
import { ClosingCta } from "@/components/ui/closing-cta";

export const metadata: Metadata = {
  title: "About — Lumon Studios",
  description:
    "Lumon Studios is a small, focused studio building course systems, funnels, and websites for coaches, consultants, and training organisations.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "Sell a result, not a deliverable.",
    description:
      "Nobody wants a course website. They want more paying students. We build for the result.",
  },
  {
    title: "Small, focused, senior.",
    description:
      "No junior handoffs. No offshore chains. The person you talk to is the person building your project.",
  },
  {
    title: "Ship what works, not what looks impressive.",
    description:
      "Every button tested. Every automation verified. If a piece is only theoretically working, it isn't shipped.",
  },
  {
    title: "The client owns everything.",
    description:
      "Every account, every asset, every file. If we part ways, nothing follows me out the door.",
  },
  {
    title: "Honest about scope.",
    description:
      "If something you want isn't going to work, we say so before the invoice, not after.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-white">
        <Container className="grid grid-cols-1 items-center gap-10 pt-36 pb-20 sm:pt-44 sm:pb-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl">
              Built for coaches who <em className="italic">take the work seriously.</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Lumon Studios is a small, focused studio building course
              systems, funnels, and websites for coaches, consultants, and
              training organisations.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-wide text-gray-500 uppercase">
              <span>100+ builds shipped</span>
              <span className="text-gray-300">·</span>
              <span>US, UK, Canada &amp; Australia</span>
              <span className="text-gray-300">·</span>
              <span>EE background</span>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
            <Image
              src="/team/tobi-speaking.jpg"
              alt="Tobi Ojet speaking on stage"
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* The founder's letter */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
            <div className="relative aspect-square overflow-hidden rounded-3xl lg:aspect-auto lg:h-full">
              <Image
                src="/team/tobi-headshot.jpg"
                alt="Tobi Ojet, founder of Lumon Studios"
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
                How Lumon Studios <em className="italic">started.</em>
              </h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                <p>
                  I&rsquo;m Tobi. I&rsquo;ve spent the last few years building
                  course platforms, funnels, and websites for coaches,
                  consultants, and course creators — mostly on Kajabi,
                  Thinkific, Teachable, GoHighLevel, and WordPress. Somewhere
                  between the sixtieth build and the hundredth, a pattern
                  became impossible to ignore.
                </p>
                <p>
                  Most of my clients didn&rsquo;t have a course problem. They
                  had a system problem. The course was fine. What was
                  missing was the machinery around it — the funnel, the
                  automation, the follow-up, the website that matched their
                  level. Without those, even the best course sat idle.
                </p>
                <p>
                  Lumon Studios is what I built to solve that. Not a Fiverr
                  freelancer service. Not a $15,000-a-month agency. A
                  focused studio where I do the work myself, with the
                  standards I&rsquo;d want if I were on the other side of
                  the invoice.
                </p>
              </div>
              <div className="mt-8 border-t border-[#e9e9ea] pt-6">
                <p className="text-lg font-medium">Tobi Ojet</p>
                <p className="mt-1 font-mono text-xs tracking-wide text-gray-500 uppercase">
                  Founder, Lumon Studios
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
                  Currently a team of one, by design — no junior handoffs,
                  ever. When that changes, this page will say so.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* What Lumon Studios stands for */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
            A few things worth <em className="italic">being clear about.</em>
          </h2>
          <div className="mt-10">
            <NumberedList items={PRINCIPLES} />
          </div>
          <p className="mt-10 text-sm text-gray-500">
            See the work itself in the{" "}
            <Link href="/case-studies" className="underline underline-offset-4 hover:text-black">
              case studies
            </Link>
            .
          </p>
        </Container>
      </section>

      <ClosingCta buttonLabel="Yes! Let's talk">
        If any of this sounds like your kind of work —{" "}
        <em className="italic">let&rsquo;s talk.</em>
      </ClosingCta>

      <section className="bg-[#fbfbfb] pb-16 text-center">
        <Container>
          <p className="text-sm text-gray-500">
            Prefer to write first?{" "}
            <Link href="/contact" className="underline underline-offset-4 hover:text-black">
              Send us a message
            </Link>{" "}
            instead.
          </p>
        </Container>
      </section>
    </>
  );
}

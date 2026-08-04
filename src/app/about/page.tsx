import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { NumberedList } from "@/components/ui/numbered-list";
import { ClosingCta } from "@/components/ui/closing-cta";

export const metadata: Metadata = {
  title: "About — Lumon Studios",
  description:
    "Lumon Studios is a small, focused studio building course systems, funnels, and websites for coaches, consultants, and training organisations.",
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

const RECORD = [
  {
    stat: "100+ course platforms and websites built.",
    detail:
      "Kajabi, Thinkific, Teachable, GoHighLevel, Webflow, WordPress, and custom builds.",
  },
  {
    stat: "Clients across the US, UK, Canada, and Australia.",
    detail:
      "Coaches, consultants, therapists, agencies, and training organisations.",
  },
  {
    stat: "Background in Electrical & Electronics Engineering.",
    detail:
      "The systems mindset is baked in — every project is engineered, not just decorated.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-white">
        <Container className="grid grid-cols-1 gap-8 pt-36 pb-20 sm:pt-44 sm:pb-28 lg:grid-cols-2 lg:gap-16">
          <h1 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl lg:text-6xl">
            Built for coaches who <em className="italic">take the work seriously.</em>
          </h1>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
            Lumon Studios is a small, focused studio building course systems,
            funnels, and websites for coaches, consultants, and training
            organisations.
          </p>
        </Container>
      </section>

      {/* The story */}
      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
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
                had a system problem. The course was fine. What was missing
                was the machinery around it — the funnel, the automation, the
                follow-up, the website that matched their level. Without
                those, even the best course sat idle.
              </p>
              <p>
                Lumon Studios is what I built to solve that. Not a Fiverr
                freelancer service. Not a $15,000-a-month agency. A focused
                studio where I do the work myself, with the standards I&rsquo;d
                want if I were on the other side of the invoice.
              </p>
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
        </Container>
      </section>

      {/* Experience snapshot */}
      <section className="bg-[#070707] text-white">
        <Container className="py-16 sm:py-20">
          <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
            The <em className="italic">record.</em>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {RECORD.map((item) => (
              <div key={item.stat}>
                <p className="text-xl leading-snug font-normal sm:text-2xl">
                  {item.stat}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta buttonLabel="Book a Discovery Call">
        If any of this sounds like your kind of work —{" "}
        <em className="italic">let&rsquo;s talk.</em>
      </ClosingCta>
    </>
  );
}

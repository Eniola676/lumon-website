import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { WorkCard } from "@/components/ui/work-card";
import { getAllCaseStudies, caseStudyToWorkItem } from "@/lib/case-studies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Case Studies — Lumon Studios",
  description:
    "Real course systems, funnels, and websites built for coaches, consultants, and training organisations.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <section className="bg-white">
      <Container className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">Case Studies</p>
        <h1 className="mt-3 max-w-2xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
          Real builds, <em className="italic">real results.</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Course systems, funnels, and websites built for coaches,
          consultants, and training organisations.
        </p>

        {caseStudies.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <WorkCard key={caseStudy.id} {...caseStudyToWorkItem(caseStudy)} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm text-gray-500">
            New case studies are on the way — check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}

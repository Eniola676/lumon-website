import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { WorkCard } from "@/components/ui/work-card";
import { TextReviewCard } from "@/components/ui/review-cards";
import { ClosingCta } from "@/components/ui/closing-cta";
import { getPortableTextComponents } from "@/components/blog/portable-text-components";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  caseStudyToWorkItem,
  OFFER_LABELS,
  type CaseStudyFull,
} from "@/lib/case-studies";
import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/sanity/image";

export const revalidate = 3600;

// No table of contents / heading anchors needed for case study narrative
// sections, so an empty map is fine here.
const portableTextComponents = getPortableTextComponents(new Map());

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  const url = `${SITE_URL}/case-studies/${caseStudy.slug}`;
  const title = `${OFFER_LABELS[caseStudy.relatedOffer]} for ${caseStudy.companyName} — Lumon Studios`;
  const ogImage = urlFor(caseStudy.coverImage).width(1200).height(630).fit("crop").auto("format").url();

  return {
    title,
    description: caseStudy.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: caseStudy.metaDescription,
      url,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: caseStudy.metaDescription,
      images: [ogImage],
    },
  };
}

const NARRATIVE_SECTIONS: { key: keyof CaseStudyFull; heading: string }[] = [
  { key: "theClient", heading: "The Client" },
  { key: "theChallenge", heading: "The Challenge" },
  { key: "whatWeBuilt", heading: "What We Built Together" },
  { key: "theResults", heading: "The Results" },
  { key: "whatsPossible", heading: "What's Possible" },
];

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const relatedCaseStudies = await getRelatedCaseStudies(caseStudy, 3);
  const url = `${SITE_URL}/case-studies/${caseStudy.slug}`;
  const offerLabel = OFFER_LABELS[caseStudy.relatedOffer];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${offerLabel} for ${caseStudy.companyName}`,
    description: caseStudy.metaDescription,
    image: [urlFor(caseStudy.coverImage).width(1200).auto("format").url()],
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.publishedAt,
    author: { "@type": "Organization", name: "Lumon Studios" },
    publisher: { "@type": "Organization", name: "Lumon Studios" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-white">
        <Container className="pt-32 pb-6 sm:pt-40">
          <nav className="flex items-center gap-2 font-mono text-xs tracking-wide text-gray-400 uppercase">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/case-studies" className="hover:text-black">
              Case Studies
            </Link>
          </nav>
        </Container>
      </section>

      {/* Hero */}
      <section className="bg-white">
        <Container className="pb-16 sm:pb-20">
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl bg-[#fbfbfb]">
            <Image
              src={urlFor(caseStudy.coverImage).width(1800).height(788).fit("crop").auto("format").url()}
              alt={caseStudy.coverImage.alt ?? `${caseStudy.companyName} case study`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">Case Study</p>
              <h1 className="mt-3 text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
                {offerLabel} <em className="italic">for {caseStudy.companyName}.</em>
              </h1>

              <div className="mt-6 flex items-center gap-3">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-[#fbfbfb]">
                  <Image
                    src={urlFor(caseStudy.clientImage).width(88).height(88).fit("crop").auto("format").url()}
                    alt={caseStudy.clientImage.alt ?? caseStudy.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">{caseStudy.clientName}</p>
                  {caseStudy.clientRole && (
                    <p className="text-sm text-gray-500">{caseStudy.clientRole}</p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CalendlyButton variant="primary">Book a Discovery Call</CalendlyButton>
                {caseStudy.projectLink && (
                  <a
                    href={caseStudy.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-gray-600 underline underline-offset-4 hover:text-black"
                  >
                    Visit project ↗
                  </a>
                )}
              </div>
            </div>

            {(caseStudy.statHighlight || caseStudy.relatedOffer !== "none" || (caseStudy.toolsUsed?.length ?? 0) > 0) && (
              <div className="rounded-2xl border border-[#e9e9ea] bg-[#fbfbfb] p-6">
                {caseStudy.statHighlight && (
                  <p className="text-2xl leading-snug font-medium">{caseStudy.statHighlight}</p>
                )}
                {caseStudy.relatedOffer !== "none" && (
                  <div className={caseStudy.statHighlight ? "mt-6" : ""}>
                    <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
                      Featured Service
                    </p>
                    <p className="mt-2 text-sm font-medium">{offerLabel}</p>
                  </div>
                )}
                {caseStudy.toolsUsed && caseStudy.toolsUsed.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
                      Tools Used
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {caseStudy.toolsUsed.map((tool) => (
                        <span
                          key={tool.name}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#e9e9ea] bg-white px-3 py-1.5 text-xs font-medium"
                        >
                          {tool.logo && (
                            <span className="relative size-4 overflow-hidden rounded-full">
                              <Image
                                src={urlFor(tool.logo).width(32).height(32).fit("crop").auto("format").url()}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </span>
                          )}
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Narrative sections */}
      {NARRATIVE_SECTIONS.map(({ key, heading }, index) => {
        const value = caseStudy[key];
        if (!value || (Array.isArray(value) && value.length === 0)) return null;
        return (
          <section key={key} className={index % 2 === 0 ? "bg-[#fbfbfb]" : "bg-white"}>
            <Container className="py-16 sm:py-24">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
                  {heading}
                </h2>
                <div className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
                  <PortableText
                    // Narrative section fields are typed as PortableTextBlock[]
                    value={value as CaseStudyFull["theClient"]}
                    components={portableTextComponents}
                  />
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Gallery */}
      {caseStudy.gallery && caseStudy.gallery.length > 0 && (
        <section className="bg-white">
          <Container className="py-16 sm:py-24">
            <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
              The <em className="italic">work.</em>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {caseStudy.gallery.map((image, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#fbfbfb]">
                  <Image
                    src={urlFor(image).width(1000).height(750).fit("crop").auto("format").url()}
                    alt={image.alt ?? `${caseStudy.companyName} project image ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Testimonials */}
      {caseStudy.testimonials && caseStudy.testimonials.length > 0 && (
        <section className="bg-[#fbfbfb]">
          <Container className="py-16 sm:py-24">
            <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
              In their <em className="italic">words.</em>
            </h2>
            <div className="mt-10 columns-1 gap-6 sm:columns-2">
              {caseStudy.testimonials.map((testimonial) => (
                <TextReviewCard
                  key={testimonial.name}
                  name={testimonial.name}
                  platform={testimonial.role || caseStudy.companyName}
                  text={testimonial.quote}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Related case studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="border-t border-[#e9e9ea] bg-white">
          <Container className="py-16 sm:py-24">
            <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
              Explore more <em className="italic">case studies.</em>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCaseStudies.map((related) => (
                <WorkCard key={related.id} {...caseStudyToWorkItem(related)} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ClosingCta buttonLabel="Book a Discovery Call">
        Want results like {caseStudy.companyName}&rsquo;s?{" "}
        <em className="italic">Let&rsquo;s talk.</em>
      </ClosingCta>
    </>
  );
}

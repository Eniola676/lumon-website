import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/container";
import { WorkCard } from "@/components/ui/work-card";
import { ClosingCta } from "@/components/ui/closing-cta";
import { getPortableTextComponents } from "@/components/blog/portable-text-components";
import { getCaseStudiesByIndustry, caseStudyToWorkItem } from "@/lib/case-studies";
import {
  getAllIndustries,
  getAllIndustrySlugs,
  getIndustryBySlug,
  industryHeading,
} from "@/lib/industries";
import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/sanity/image";

export const revalidate = 3600;

const portableTextComponents = getPortableTextComponents(new Map());

export async function generateStaticParams() {
  const slugs = await getAllIndustrySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};

  const url = `${SITE_URL}/industries/${industry.slug}`;
  const title = industry.seoTitle || `Website Design for ${industry.title} | Lumon Studios`;
  const description = industry.metaDescription || industry.shortDescription;
  const ogImage = industry.image
    ? urlFor(industry.image).width(1200).height(630).fit("crop").auto("format").url()
    : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    // No projects yet = thin page. Stay reachable but out of the index.
    robots: industry.projectCount === 0 ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const [caseStudies, allIndustries] = await Promise.all([
    getCaseStudiesByIndustry(industry.id),
    getAllIndustries(),
  ]);
  const others = allIndustries.filter((other) => other.id !== industry.id && other.projectCount > 0);
  const url = `${SITE_URL}/industries/${industry.slug}`;
  const heading = industryHeading(industry);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: heading,
      description: industry.metaDescription || industry.shortDescription,
      url,
      isPartOf: { "@type": "WebSite", name: "Lumon Studios", url: SITE_URL },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: caseStudies.map((caseStudy, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${caseStudy.companyName} — ${caseStudy.title}`,
          url: `${SITE_URL}/case-studies/${caseStudy.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
        { "@type": "ListItem", position: 3, name: industry.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white">
        <Container className="pt-32 pb-12 sm:pt-40 sm:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 font-mono text-xs tracking-wide text-gray-400 uppercase"
          >
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/industries" className="hover:text-black">
              Industries
            </Link>
          </nav>
          <h1 className="mt-6 max-w-4xl text-4xl leading-[1.1] font-normal tracking-tight sm:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {industry.shortDescription}
          </p>
        </Container>
      </section>

      {industry.intro && industry.intro.length > 0 && (
        <section className="bg-[#fbfbfb]">
          <Container className="py-16 sm:py-24">
            <div className="max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg">
              <PortableText value={industry.intro} components={portableTextComponents} />
            </div>
          </Container>
        </section>
      )}

      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <h2 className="text-3xl leading-[1.15] font-normal tracking-tight sm:text-4xl">
            {industry.title} <em className="italic">projects.</em>
          </h2>
          {caseStudies.length > 0 ? (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((caseStudy) => (
                <WorkCard key={caseStudy.id} {...caseStudyToWorkItem(caseStudy)} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm text-gray-500">
              Projects for this industry are on the way. Meanwhile, browse{" "}
              <Link href="/case-studies" className="underline underline-offset-4 hover:text-black">
                all case studies
              </Link>
              .
            </p>
          )}
        </Container>
      </section>

      {others.length > 0 && (
        <section className="border-t border-[#e9e9ea] bg-[#fbfbfb]">
          <Container className="py-12">
            <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
              Other industries
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/industries/${other.slug}`}
                  className="rounded-full border border-[#e9e9ea] bg-white px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-black"
                >
                  {other.title}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <ClosingCta buttonLabel="Yes! Let's build mine">
        Want a site built for <em className="italic">{industry.title}?</em>
      </ClosingCta>
    </>
  );
}

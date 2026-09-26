import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ClosingCta } from "@/components/ui/closing-cta";
import { getAllIndustries } from "@/lib/industries";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "Industries We Build For — Lumon Studios";
const DESCRIPTION =
  "Website design and course systems built for specific industries. Browse the sectors we work in and the projects we've delivered for each.";

export async function generateMetadata(): Promise<Metadata> {
  const industries = await getAllIndustries();

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "/industries" },
    // An empty index is a thin page — keep it out of search until there's content.
    robots: industries.length === 0 ? { index: false, follow: true } : undefined,
    openGraph: { title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/industries`, type: "website" },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  };
}

export default async function IndustriesPage() {
  const industries = await getAllIndustries();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Industries We Build For",
      description: DESCRIPTION,
      url: `${SITE_URL}/industries`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: industries.map((industry, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: industry.title,
          url: `${SITE_URL}/industries/${industry.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-white">
        <Container className="pt-36 pb-12 sm:pt-44 sm:pb-16">
          <h1 className="text-5xl leading-[1.1] font-normal tracking-tight sm:text-6xl">
            Industries
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Every industry has its own buyers, its own trust signals, and its
            own way of turning a visitor into a customer. Here&rsquo;s where
            we&rsquo;ve built, and the projects behind it.
          </p>
        </Container>
      </section>

      <section className="bg-[#fbfbfb]">
        <Container className="py-16 sm:py-24">
          {industries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#e9e9ea] bg-white p-16 text-center">
              <p className="text-lg font-medium">Industries coming soon.</p>
              <p className="mt-2 text-sm text-gray-500">
                In the meantime, see{" "}
                <Link href="/case-studies" className="underline underline-offset-4 hover:text-black">
                  all case studies
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-[#e9e9ea] bg-white p-7 transition-colors hover:border-black"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-2xl leading-tight font-normal tracking-tight">
                        {industry.title}
                      </h2>
                      <ArrowUpRight className="mt-1 size-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                      {industry.shortDescription}
                    </p>
                    <p className="mt-auto pt-6 font-mono text-xs tracking-wide text-gray-500 uppercase">
                      {industry.projectCount} {industry.projectCount === 1 ? "project" : "projects"}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <ClosingCta buttonLabel="Yes! Let's talk about my industry">
        Don&rsquo;t see your industry? <em className="italic">We probably still build for it.</em>
      </ClosingCta>
    </>
  );
}

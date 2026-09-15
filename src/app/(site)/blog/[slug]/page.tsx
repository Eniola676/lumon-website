import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Container } from "@/components/ui/container";
import { CalendlyButton } from "@/components/ui/calendly-button";
import { AiSummaryLinks } from "@/components/ui/ai-summary-links";
import { ShareLinks } from "@/components/blog/share-links";
import { PostCard } from "@/components/blog/post-card";
import { getPortableTextComponents } from "@/components/blog/portable-text-components";
import { LinkedinIcon, PinterestIcon } from "@/components/ui/social-icons";
import { getAllSlugs, getPostBySlug, getRelatedPosts, slugifyCategory } from "@/lib/blog";
import { getHeadingIds, getToc } from "@/lib/blog-content";
import { formatPostDate } from "@/lib/format-date";
import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/sanity/image";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  const ogImage = urlFor(post.mainImage).width(1200).height(630).fit("crop").auto("format").url();

  return {
    title: `${post.title} — Lumon Studios`,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const toc = getToc(post.body);
  const headingIds = getHeadingIds(post.body);
  const components = getPortableTextComponents(headingIds);

  const relatedPosts = await getRelatedPosts(post, 3);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLdImage = urlFor(post.mainImage).width(1200).auto("format").url();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: [jsonLdImage],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
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
            <Link href="/blog" className="hover:text-black">
              Blog
            </Link>
          </nav>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 pb-16 lg:grid-cols-[240px_1fr_240px] lg:gap-10">
          {/* Left sidebar */}
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start lg:order-1">
            {toc.length > 0 && (
              <div className="rounded-2xl border border-[#e9e9ea] bg-[#fbfbfb] p-6">
                <p className="font-mono text-xs tracking-wide text-gray-500 uppercase">
                  Table of contents
                </p>
                <ul className="mt-4 divide-y divide-[#e9e9ea]">
                  {toc.map((item) => (
                    <li key={item.id} className="py-2.5 first:pt-0 last:pb-0">
                      <a
                        href={`#${item.id}`}
                        className={`block text-sm leading-snug text-gray-600 hover:text-black ${
                          item.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-[#070707] p-6 text-white">
              <p className="text-lg font-medium">Want this done for you?</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Book a free discovery call and we&rsquo;ll map out what your
                business actually needs.
              </p>
              <div className="mt-5">
                <CalendlyButton variant="primary-invert" className="w-full">
                  Yes! Let&rsquo;s talk
                </CalendlyButton>
              </div>
              <p className="mt-4 text-center text-xs text-white/40">
                Prefer email?{" "}
                <Link href="/contact-us" className="underline underline-offset-2 hover:text-white">
                  Get in touch
                </Link>
                . Or see what your course should{" "}
                <Link
                  href="/tools/course-price-calculator"
                  className="underline underline-offset-2 hover:text-white"
                >
                  cost
                </Link>
                .
              </p>
            </div>
          </aside>

          {/* Article */}
          <article className="lg:order-2">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-gray-500 uppercase">
                {post.category && (
                  <>
                    <Link
                      href={`/blog/category/${slugifyCategory(post.category)}`}
                      className="hover:text-black hover:underline"
                    >
                      {post.category}
                    </Link>
                    <span aria-hidden>·</span>
                  </>
                )}
                Last updated: {formatPostDate(post.publishedAt)}
              </p>
              <ShareLinks url={url} title={post.title} />
            </div>

            <h1 className="mt-6 text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              {post.metaDescription}
            </p>

            <div className="mt-8 rounded-xl border border-[#e9e9ea] bg-[#fbfbfb] px-5 py-4">
              <AiSummaryLinks
                label="Summarize this article with:"
                variant="light"
              />
            </div>

            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-[#fbfbfb]">
              <Image
                src={urlFor(post.mainImage).width(1600).height(900).fit("crop").auto("format").url()}
                alt={post.mainImage.alt ?? post.title}
                fill
                priority
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-10 text-base leading-relaxed text-gray-700">
              <PortableText value={post.body} components={components} />
            </div>

            {post.pinterestUrl && (
              <a
                href={post.pinterestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
              >
                <PinterestIcon className="size-4" />
                Pin this
              </a>
            )}
          </article>

          {/* Right sidebar — author */}
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start lg:order-3">
            <div className="rounded-2xl border border-[#e9e9ea] bg-[#fbfbfb] p-6">
              <div className="flex size-12 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                TO
              </div>
              <p className="mt-4 text-lg font-medium">Tobi Ojetoyinbo</p>
              <p className="text-sm text-gray-500">Founder, Lumon Studios</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Tobi builds course platforms, funnels, and back-office
                systems for coaches and consultants. After years of shipping
                course sites that looked great but didn&rsquo;t sell, he
                started Lumon Studios to fix the machinery behind the
                storefront.
              </p>
              <a
                href="https://www.linkedin.com/company/lumon-studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-black"
              >
                <LinkedinIcon className="size-4" />
                LinkedIn
              </a>
            </div>
          </aside>
        </Container>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-[#e9e9ea] bg-[#fbfbfb]">
          <Container className="py-16 sm:py-24">
            <h2 className="text-3xl leading-[1.1] font-normal tracking-tight sm:text-4xl">
              More from the <em className="italic">blog.</em>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <PostCard key={related.id} post={related} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";

export type Industry = {
  id: string;
  title: string;
  slug: string;
  headline?: string;
  shortDescription: string;
  seoTitle?: string;
  metaDescription?: string;
  image?: SanityImageSource & { alt?: string };
  projectCount: number;
};

export type IndustryFull = Industry & { intro?: PortableTextBlock[] };

// Only published case studies count toward an industry — an industry with
// zero live projects is a thin page, so callers treat projectCount === 0 as
// "don't index / don't put in the sitemap".
const INDUSTRY_FIELDS = /* groq */ `
  "id": _id,
  title,
  "slug": slug.current,
  headline,
  shortDescription,
  seoTitle,
  metaDescription,
  image,
  "projectCount": count(*[_type == "caseStudy" && publishedAt <= now() && references(^._id)])
`;

const ORDER = `order(coalesce(order, 9999) asc, title asc)`;

export const industryHeading = (industry: Pick<Industry, "title" | "headline">) =>
  industry.headline || `Website design for ${industry.title}`;

export async function getAllIndustries(): Promise<Industry[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<Industry[]>(
      `*[_type == "industry"] | ${ORDER} { ${INDUSTRY_FIELDS} }`
    );
  } catch (err) {
    console.error("getAllIndustries failed", err);
    return [];
  }
}

export async function getCoreIndustries(): Promise<Pick<Industry, "id" | "title" | "slug">[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch(
      `*[_type == "industry" && coreIndustry == true] | ${ORDER} { "id": _id, title, "slug": slug.current }`
    );
  } catch (err) {
    console.error("getCoreIndustries failed", err);
    return [];
  }
}

export async function getIndustryBySlug(slug: string): Promise<IndustryFull | null> {
  if (!sanityClient) return null;

  try {
    const industry = await sanityClient.fetch<IndustryFull | null>(
      `*[_type == "industry" && slug.current == $slug][0] { ${INDUSTRY_FIELDS}, intro }`,
      { slug }
    );
    return industry ?? null;
  } catch (err) {
    console.error("getIndustryBySlug failed", err);
    return null;
  }
}

export async function getAllIndustrySlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<string[]>(`*[_type == "industry"].slug.current`);
  } catch (err) {
    console.error("getAllIndustrySlugs failed", err);
    return [];
  }
}

export async function getSitemapIndustries(): Promise<{ slug: string; lastModified: string }[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch(
      `*[_type == "industry" && count(*[_type == "caseStudy" && publishedAt <= now() && references(^._id)]) > 0] {
        "slug": slug.current,
        "lastModified": _updatedAt
      }`
    );
  } catch (err) {
    console.error("getSitemapIndustries failed", err);
    return [];
  }
}

import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import type { WorkItem } from "@/components/ui/work-card";

export type CaseStudyImage = SanityImageSource & { alt?: string };

export type RelatedOffer = "none" | "launch" | "scale" | "enterprise";

export const OFFER_LABELS: Record<RelatedOffer, string> = {
  none: "Case Study",
  launch: "Lumon Launch",
  scale: "Lumon Scale",
  enterprise: "Lumon Enterprise",
};

export type CaseStudyTool = {
  name: string;
  logo?: CaseStudyImage;
};

export type CaseStudyGalleryImage = CaseStudyImage & { _type: "image" };

export type CaseStudyGalleryVideo = {
  _type: "galleryVideo";
  file: { url: string; mimeType?: string };
  poster?: CaseStudyImage;
  caption?: string;
};

export type CaseStudyGalleryItem = CaseStudyGalleryImage | CaseStudyGalleryVideo;

export type CaseStudyTestimonial = {
  quote: string;
  name: string;
  role?: string;
  rating: number;
  avatar?: CaseStudyImage;
};

export type CaseStudyCard = {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientRole?: string;
  companyName: string;
  summary: string;
  statHighlight?: string;
  relatedOffer: RelatedOffer;
  clientImage: CaseStudyImage;
  coverImage: CaseStudyImage;
  publishedAt: string;
};

export type CaseStudyFull = CaseStudyCard & {
  projectLink?: string;
  toolsUsed?: CaseStudyTool[];
  gallery?: CaseStudyGalleryItem[];
  testimonials?: CaseStudyTestimonial[];
  theClient: PortableTextBlock[];
  theChallenge: PortableTextBlock[];
  whatWeBuilt: PortableTextBlock[];
  theResults: PortableTextBlock[];
  whatsPossible?: PortableTextBlock[];
  metaDescription: string;
};

// Every field a card/grid needs — never fetch the narrative sections or
// gallery here, those are only pulled for the single case-study query.
const CARD_FIELDS = /* groq */ `
  "id": _id,
  title,
  "slug": slug.current,
  clientName,
  clientRole,
  companyName,
  summary,
  statHighlight,
  relatedOffer,
  clientImage,
  coverImage,
  publishedAt
`;

// Scheduling gate, same free-tier workaround as blog posts: Sanity's free
// plan has no native scheduled publishing, so publishedAt is checked here.
const PUBLISHED_FILTER = `_type == "caseStudy" && publishedAt <= now()`;

export async function getFeaturedCaseStudies(limit = 6): Promise<CaseStudyCard[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<CaseStudyCard[]>(
      `*[${PUBLISHED_FILTER} && featured == true] | order(publishedAt desc) [0...$limit] { ${CARD_FIELDS} }`,
      { limit }
    );
  } catch (err) {
    console.error("getFeaturedCaseStudies failed", err);
    return [];
  }
}

export type WebsiteDesignCaseStudy = CaseStudyCard & {
  tools?: string[];
  previewImages?: CaseStudyImage[];
};

export async function getWebsiteDesignCaseStudies(limit = 8): Promise<WebsiteDesignCaseStudy[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<WebsiteDesignCaseStudy[]>(
      `*[${PUBLISHED_FILTER} && featuredOnWebsiteDesign == true] | order(publishedAt desc) [0...$limit] {
        ${CARD_FIELDS},
        "tools": toolsUsed[].name,
        "previewImages": gallery[_type == "image"][0...2]
      }`,
      { limit }
    );
  } catch (err) {
    console.error("getWebsiteDesignCaseStudies failed", err);
    return [];
  }
}

export async function getCaseStudiesByOffer(
  offer: Exclude<RelatedOffer, "none">,
  limit = 3
): Promise<CaseStudyCard[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<CaseStudyCard[]>(
      `*[${PUBLISHED_FILTER} && relatedOffer == $offer] | order(publishedAt desc) [0...$limit] { ${CARD_FIELDS} }`,
      { offer, limit }
    );
  } catch (err) {
    console.error("getCaseStudiesByOffer failed", err);
    return [];
  }
}

export async function getAllCaseStudies(): Promise<CaseStudyCard[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<CaseStudyCard[]>(
      `*[${PUBLISHED_FILTER}] | order(publishedAt desc) { ${CARD_FIELDS} }`
    );
  } catch (err) {
    console.error("getAllCaseStudies failed", err);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudyFull | null> {
  if (!sanityClient) return null;

  try {
    const caseStudy = await sanityClient.fetch<CaseStudyFull | null>(
      `*[${PUBLISHED_FILTER} && slug.current == $slug][0] {
        ${CARD_FIELDS},
        projectLink,
        toolsUsed,
        gallery[]{
          ...,
          _type == "galleryVideo" => { "file": file.asset->{url, mimeType} }
        },
        testimonials,
        theClient,
        theChallenge,
        whatWeBuilt,
        theResults,
        whatsPossible,
        metaDescription
      }`,
      { slug }
    );
    return caseStudy ?? null;
  } catch (err) {
    console.error("getCaseStudyBySlug failed", err);
    return null;
  }
}

export async function getRelatedCaseStudies(
  current: Pick<CaseStudyFull, "id" | "relatedOffer">,
  limit = 3
): Promise<CaseStudyCard[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<CaseStudyCard[]>(
      `*[${PUBLISHED_FILTER} && _id != $id] {
        ${CARD_FIELDS},
        "sameOffer": relatedOffer == $offer
      } | order(sameOffer desc, publishedAt desc) [0...$limit]`,
      { id: current.id, offer: current.relatedOffer, limit }
    );
  } catch (err) {
    console.error("getRelatedCaseStudies failed", err);
    return [];
  }
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<string[]>(`*[${PUBLISHED_FILTER}].slug.current`);
  } catch (err) {
    console.error("getAllCaseStudySlugs failed", err);
    return [];
  }
}

// Maps a case study onto the generic WorkCard grid shape used throughout
// the site (homepage, offer-page "Proof" sections, related case studies),
// so those grids don't need to know anything about Sanity.
export function caseStudyToWorkItem(caseStudy: CaseStudyCard): WorkItem {
  return {
    name: caseStudy.companyName,
    title: caseStudy.summary,
    image: urlFor(caseStudy.coverImage).width(800).height(600).fit("crop").auto("format").url(),
    href: `/case-studies/${caseStudy.slug}`,
  };
}

export async function getSitemapCaseStudies(): Promise<
  { slug: string; publishedAt: string }[]
> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<{ slug: string; publishedAt: string }[]>(
      `*[${PUBLISHED_FILTER}] { "slug": slug.current, publishedAt }`
    );
  } catch (err) {
    console.error("getSitemapCaseStudies failed", err);
    return [];
  }
}

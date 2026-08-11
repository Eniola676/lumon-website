import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";

export type PostImage = SanityImageSource & { alt?: string };

export type Post = {
  id: string;
  title: string;
  slug: string;
  metaDescription: string;
  mainImage: PostImage;
  category: string | null;
  pinterestUrl: string | null;
  publishedAt: string;
};

export type PostWithBody = Post & { body: PortableTextBlock[] };

// Every field we need for a listing card / OG image — never fetch `body`
// here, that's only pulled for the single-post query.
const CARD_FIELDS = /* groq */ `
  "id": _id,
  title,
  "slug": slug.current,
  metaDescription,
  mainImage,
  category,
  pinterestUrl,
  publishedAt
`;

// The scheduling workaround: Sanity's free plan has no native scheduled
// publishing, so editors set a future publishedAt and this filter is what
// actually hides the post from the site until that time passes.
const PUBLISHED_FILTER = `_type == "post" && publishedAt <= now()`;

const PAGE_SIZE = 9;

export async function getPosts({
  page = 1,
  category,
}: { page?: number; category?: string } = {}): Promise<{
  posts: Post[];
  total: number;
  pageSize: number;
}> {
  if (!sanityClient) return { posts: [], total: 0, pageSize: PAGE_SIZE };

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const filter = category
    ? `${PUBLISHED_FILTER} && category == $category`
    : PUBLISHED_FILTER;

  try {
    const [posts, total] = await Promise.all([
      sanityClient.fetch<Post[]>(
        `*[${filter}] | order(publishedAt desc) [$start...$end] { ${CARD_FIELDS} }`,
        { category, start, end }
      ),
      sanityClient.fetch<number>(`count(*[${filter}])`, { category }),
    ]);
    return { posts, total, pageSize: PAGE_SIZE };
  } catch (err) {
    console.error("getPosts failed", err);
    return { posts: [], total: 0, pageSize: PAGE_SIZE };
  }
}

export async function getLatestPosts(limit = 3): Promise<Post[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<Post[]>(
      `*[${PUBLISHED_FILTER}] | order(publishedAt desc) [0...$limit] { ${CARD_FIELDS} }`,
      { limit }
    );
  } catch (err) {
    console.error("getLatestPosts failed", err);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<PostWithBody | null> {
  if (!sanityClient) return null;

  try {
    const post = await sanityClient.fetch<PostWithBody | null>(
      `*[${PUBLISHED_FILTER} && slug.current == $slug][0] { ${CARD_FIELDS}, body }`,
      { slug }
    );
    return post ?? null;
  } catch (err) {
    console.error("getPostBySlug failed", err);
    return null;
  }
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<Post[]>(
      `*[${PUBLISHED_FILTER} && _id != $id] {
        ${CARD_FIELDS},
        "sameCategory": category == $category
      } | order(sameCategory desc, publishedAt desc) [0...$limit]`,
      { id: post.id, category: post.category, limit }
    );
  } catch (err) {
    console.error("getRelatedPosts failed", err);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  if (!sanityClient) return [];

  try {
    const categories = await sanityClient.fetch<(string | null)[]>(
      `array::unique(*[${PUBLISHED_FILTER} && defined(category)].category)`
    );
    return categories.filter((c): c is string => Boolean(c)).sort();
  } catch (err) {
    console.error("getCategories failed", err);
    return [];
  }
}

export async function getAllSlugs(): Promise<string[]> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<string[]>(
      `*[${PUBLISHED_FILTER}].slug.current`
    );
  } catch (err) {
    console.error("getAllSlugs failed", err);
    return [];
  }
}

export async function getSitemapPosts(): Promise<
  { slug: string; publishedAt: string }[]
> {
  if (!sanityClient) return [];

  try {
    return await sanityClient.fetch<{ slug: string; publishedAt: string }[]>(
      `*[${PUBLISHED_FILTER}] { "slug": slug.current, publishedAt }`
    );
  } catch (err) {
    console.error("getSitemapPosts failed", err);
    return [];
  }
}

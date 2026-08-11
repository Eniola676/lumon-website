import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getSitemapPosts } from "@/lib/blog";

// Pages group — core marketing/offer pages.
// Quality control: only real, indexable, canonical routes belong here —
// no UTM-tagged URLs, no thin/duplicate pages, nothing carrying noindex.
const PAGES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/launch", changeFrequency: "monthly", priority: 0.9 },
  { path: "/scale", changeFrequency: "monthly", priority: 0.9 },
  { path: "/enterprise", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const pages = PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // Posts group — every published post, sourced live from the database so
  // new automated posts get discovered without a manual sitemap update.
  const posts = await getSitemapPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...postEntries];
}

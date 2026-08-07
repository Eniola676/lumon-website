import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Pages group — core marketing/offer pages.
// Add a "Posts" or "Products" group below if/when those route groups exist.
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}

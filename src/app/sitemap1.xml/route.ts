// Renamed from the sitemap.ts special-file convention (which Next.js hard-
// codes to /sitemap.xml — there's no way to rename its output through that
// convention) to a plain Route Handler serving XML directly at /sitemap1.xml.
//
// NOTE: /sitemap.xml is the de-facto standard path — some crawlers and
// third-party tools probe it by default even without reading robots.txt.
// robots.ts below has been updated to point at /sitemap1.xml, which covers
// any crawler that respects robots.txt (Google, Bing, etc.), but anything
// that hits /sitemap.xml blindly will now 404. If this site's sitemap was
// previously submitted to Google Search Console / Bing Webmaster Tools at
// the old URL, resubmit it there at the new /sitemap1.xml address.
import { SITE_URL } from "@/lib/site";
import { getCategories, getSitemapPosts } from "@/lib/blog";

export const revalidate = 3600;

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

type Entry = {
  url: string;
  lastModified: string | Date;
  changeFrequency?: ChangeFreq;
  priority?: number;
};

// Pages group — core marketing/offer pages.
// Quality control: only real, indexable, canonical routes belong here — no
// UTM-tagged URLs, no thin/duplicate pages (paginated /blog/page/[n] listings
// are deliberately excluded), nothing carrying noindex.
const PAGES: Array<{ path: string; changeFrequency: ChangeFreq; priority: number }> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/launch", changeFrequency: "monthly", priority: 0.9 },
  { path: "/scale", changeFrequency: "monthly", priority: 0.9 },
  { path: "/enterprise", changeFrequency: "monthly", priority: 0.9 },
  { path: "/tools/online-course-price-calculator", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toXml(entries: Entry[]): string {
  const urls = entries
    .map((entry) => {
      const lastmod =
        entry.lastModified instanceof Date
          ? entry.lastModified.toISOString()
          : new Date(entry.lastModified).toISOString();
      const changefreq = entry.changeFrequency
        ? `\n    <changefreq>${entry.changeFrequency}</changefreq>`
        : "";
      const priority =
        entry.priority !== undefined ? `\n    <priority>${entry.priority}</priority>` : "";
      return `  <url>\n    <loc>${escapeXml(entry.url)}</loc>\n    <lastmod>${lastmod}</lastmod>${changefreq}${priority}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export async function GET() {
  const lastModified = new Date();

  const pages: Entry[] = PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // Posts and categories are sourced live from Sanity so new content gets
  // discovered without a manual sitemap update.
  const [posts, categories] = await Promise.all([getSitemapPosts(), getCategories()]);

  const postEntries: Entry[] = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const categoryEntries: Entry[] = categories.map((category) => ({
    url: `${SITE_URL}/blog/category/${encodeURIComponent(category)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const xml = toXml([...pages, ...categoryEntries, ...postEntries]);

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

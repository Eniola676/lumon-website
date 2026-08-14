import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  return {
    title: `${name} — Blog — Lumon Studios`,
    description: `Articles about ${name} from Lumon Studios.`,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <BlogListing page={1} category={decodeURIComponent(category)} />;
}

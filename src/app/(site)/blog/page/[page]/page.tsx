import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BlogListing } from "@/components/blog/blog-listing";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: "Blog — Lumon Studios",
    description:
      "Notes on course systems, automation, and running the business side of coaching.",
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPagePaginated({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  const page = Number(pageParam);

  if (!Number.isInteger(page) || page < 1) notFound();
  if (page === 1) redirect("/blog");

  return <BlogListing page={page} />;
}

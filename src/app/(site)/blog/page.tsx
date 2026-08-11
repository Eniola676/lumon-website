import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/blog-listing";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog — Lumon Studios",
  description:
    "Notes on course systems, automation, and running the business side of coaching.",
};

export default function BlogPage() {
  return <BlogListing page={1} />;
}

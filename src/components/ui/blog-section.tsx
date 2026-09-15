import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getLatestPosts, slugifyCategory } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";
import { urlFor } from "@/sanity/image";

export async function BlogSection() {
  const posts = await getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-[#fbfbfb]">
      <Container className="py-16 sm:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
              From the <em className="italic">blog.</em>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Notes on course systems, automation, and running the business
              side of coaching.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-gray-600 hover:text-black"
          >
            View all posts
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#e9e9ea]">
                  <Image
                    src={urlFor(post.mainImage).width(600).height(375).fit("crop").auto("format").url()}
                    alt={post.mainImage.alt ?? post.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-wide text-gray-500 uppercase">
                {post.category && (
                  <Link
                    href={`/blog/category/${slugifyCategory(post.category)}`}
                    className="hover:text-black hover:underline"
                  >
                    {post.category}
                  </Link>
                )}
                {post.category && <span aria-hidden>·</span>}
                <span>{formatPostDate(post.publishedAt)}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-2 flex items-start gap-1 text-lg font-medium">
                {post.title}
                <ArrowUpRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

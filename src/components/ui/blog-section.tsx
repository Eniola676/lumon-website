import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getLatestPosts } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";
import { urlFor } from "@/sanity/image";

export async function BlogSection() {
  const posts = await getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="bg-[#fbfbfb]">
      <Container className="py-16 sm:py-24">
        <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
          From the <em className="italic">blog.</em>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Notes on course systems, automation, and running the business side
          of coaching.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#e9e9ea]">
                <Image
                  src={urlFor(post.mainImage).width(600).height(375).fit("crop").auto("format").url()}
                  alt={post.mainImage.alt ?? post.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 font-mono text-xs tracking-wide text-gray-500 uppercase">
                {post.category && <span>{post.category}</span>}
                {post.category && <span aria-hidden>·</span>}
                <span>{formatPostDate(post.publishedAt)}</span>
              </div>
              <p className="mt-2 flex items-start gap-1 text-lg font-medium">
                {post.title}
                <ArrowUpRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

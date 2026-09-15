import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog";
import { slugifyCategory } from "@/lib/blog";
import { formatPostDate } from "@/lib/format-date";
import { urlFor } from "@/sanity/image";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-[#e9e9ea] bg-white transition-shadow hover:shadow-lg hover:shadow-black/5">
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#fbfbfb]">
          <Image
            src={urlFor(post.mainImage).width(800).height(500).fit("crop").auto("format").url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 font-mono text-xs tracking-wide text-gray-400 uppercase">
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
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-3 text-lg leading-snug font-medium hover:underline">{post.title}</h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {post.metaDescription}
        </p>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { getCategories, getPosts, slugifyCategory } from "@/lib/blog";

function categoryHref(category: string) {
  return `/blog/category/${slugifyCategory(category)}`;
}

function pageHref({
  page,
  category,
}: {
  page: number;
  category?: string;
}): string {
  const base = category ? categoryHref(category) : "/blog";
  return page <= 1 ? base : `${base}/page/${page}`;
}

export async function BlogListing({
  page,
  category,
}: {
  page: number;
  category?: string;
}) {
  const [{ posts, total, pageSize }, categories] = await Promise.all([
    getPosts({ page, category }),
    getCategories(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      {/* Blog hero */}
      <section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 pt-36 pb-16 sm:pt-44 sm:pb-24 lg:grid-cols-[3fr_2fr] lg:items-start lg:gap-16">
          <div>
            <h1 className="text-5xl leading-[1.1] font-normal tracking-tight sm:text-6xl">
              Blog
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-gray-600 sm:text-lg">
              Notes on course systems, automation, and running the business
              side of coaching.
            </p>
          </div>

          {categories.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat}
                  href={categoryHref(cat)}
                  className="flex items-center justify-between rounded-xl border border-[#e9e9ea] bg-[#fbfbfb] px-5 py-4 text-sm font-medium transition-colors hover:border-black"
                >
                  {cat}
                  <ArrowUpRight className="size-4 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Filter pills */}
      {categories.length > 0 && (
        <section className="border-t border-[#e9e9ea] bg-[#fbfbfb]">
          <Container className="flex flex-wrap items-center gap-3 py-6">
            <Link
              href="/blog"
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                !category
                  ? "border-black bg-black text-white"
                  : "border-[#e9e9ea] bg-white text-gray-700 hover:border-black"
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={categoryHref(cat)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === cat
                    ? "border-black bg-black text-white"
                    : "border-[#e9e9ea] bg-white text-gray-700 hover:border-black"
                }`}
              >
                {cat}
              </Link>
            ))}
          </Container>
        </section>
      )}

      {/* Post grid — alternates against whichever section (hero or filter pills) precedes it */}
      <section className={categories.length > 0 ? "bg-white" : "bg-[#fbfbfb]"}>
        <Container className="py-16 sm:py-24">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#e9e9ea] bg-white p-16 text-center">
              <p className="text-lg font-medium">
                {category
                  ? `No posts in "${category}" yet.`
                  : "First post coming soon."}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Check back shortly — new articles are published regularly.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-4">
                  {page > 1 ? (
                    <Link
                      href={pageHref({ page: page - 1, category })}
                      className="rounded-full border border-[#e9e9ea] bg-white px-5 py-2.5 text-sm font-medium hover:border-black"
                    >
                      ← Previous
                    </Link>
                  ) : (
                    <span className="rounded-full border border-[#e9e9ea] px-5 py-2.5 text-sm font-medium text-gray-300">
                      ← Previous
                    </span>
                  )}
                  <span className="font-mono text-xs tracking-wide text-gray-400 uppercase">
                    Page {page} of {totalPages}
                  </span>
                  {page < totalPages ? (
                    <Link
                      href={pageHref({ page: page + 1, category })}
                      className="rounded-full border border-[#e9e9ea] bg-white px-5 py-2.5 text-sm font-medium hover:border-black"
                    >
                      Next →
                    </Link>
                  ) : (
                    <span className="rounded-full border border-[#e9e9ea] px-5 py-2.5 text-sm font-medium text-gray-300">
                      Next →
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}

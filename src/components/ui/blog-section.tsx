import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Placeholder } from "@/components/ui/placeholder";

const POSTS = [
  {
    category: "Strategy",
    title: "Why your course platform isn't the problem.",
  },
  {
    category: "Operations",
    title: "The hidden cost of duct-taped systems.",
  },
  {
    category: "Behind the Scenes",
    title: "What actually happens on a discovery call.",
  },
];

export function BlogSection() {
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
          {POSTS.map((post) => (
            <a key={post.title} href="#" className="group block">
              <Placeholder
                label="[ BLOG COVER IMAGE ]"
                className="min-h-[180px]"
              />
              <p className="mt-4 font-mono text-xs tracking-wide text-gray-500 uppercase">
                {post.category}
              </p>
              <p className="mt-2 flex items-start gap-1 text-lg font-medium">
                {post.title}
                <ArrowUpRight className="mt-1 size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

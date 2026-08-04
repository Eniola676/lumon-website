import { ArrowUpRight } from "lucide-react";

export interface WorkItem {
  name: string;
  title: string;
  image: string;
  href: string;
}

export function WorkCard({ name, title, image, href }: WorkItem) {
  return (
    <a
      href={href}
      className="group block overflow-hidden rounded-2xl bg-black text-white"
    >
      <div className="relative -mt-px overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={`${title} — ${name}`}
          className="h-[270px] w-full rounded-2xl object-cover object-top transition-all duration-300 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="px-4 pb-4">
        <div className="border-b border-white/15 pb-4">
          <p className="font-medium">{name}</p>
          <p className="mt-1 text-sm text-white/50">{title}</p>
        </div>
        <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors group-hover:text-white">
          View project
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
      </div>
    </a>
  );
}

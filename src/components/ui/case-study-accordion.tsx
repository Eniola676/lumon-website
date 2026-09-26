import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { WebsiteDesignCaseStudy } from "@/lib/case-studies";
import { urlFor } from "@/sanity/image";

const FALLBACK_COLOR = "#3d7cc9";

function normalizeHex(value?: string): string {
  const hex = value?.trim();
  if (!hex || !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) return FALLBACK_COLOR;
  return hex.length === 4 ? `#${[...hex.slice(1)].map((c) => c + c).join("")}` : hex;
}

// WCAG relative luminance — picks black text on light brand colours so a
// pale yellow or white brand doesn't leave unreadable white copy.
function readableTextColor(hex: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#070707" : "#ffffff";
}

// Stacked project rows that expand on hover to reveal imagery. Pure CSS
// (grid-template-rows 0fr -> 1fr) so it stays a server component. Touch
// screens have no hover, so below md the cover image is always visible.
export function CaseStudyAccordion({ items }: { items: WebsiteDesignCaseStudy[] }) {
  return (
    <div className="border-b border-white/15">
      {items.map((item) => {
        const images = [item.coverImage, ...(item.previewImages ?? [])].slice(0, 3);
        const brand = normalizeHex(item.brandColor);
        const hoverStyle = {
          "--hover-bg": brand,
          "--hover-fg": readableTextColor(brand),
        } as CSSProperties;
        const meta = [item.clientName, item.clientRole].filter(Boolean).join(", ");

        return (
          <Link
            key={item.id}
            href={`/case-studies/${item.slug}`}
            style={hoverStyle}
            className="group block border-t border-white/15 text-white transition-colors duration-500 hover:bg-[var(--hover-bg)] hover:text-[var(--hover-fg)] focus-visible:bg-[var(--hover-bg)] focus-visible:text-[var(--hover-fg)] focus-visible:outline-none motion-reduce:transition-none"
          >
            <Container>
              <div className="grid grid-cols-1 gap-5 py-8 md:grid-cols-3 md:gap-10 md:py-10">
                <h3 className="text-3xl leading-tight font-normal tracking-tight sm:text-4xl">
                  {item.companyName}
                </h3>
                <p className="max-w-md text-base leading-relaxed opacity-85 sm:text-lg">
                  {item.summary}
                </p>
                <div className="font-mono text-xs leading-6 tracking-wide uppercase opacity-85">
                  {item.tools && item.tools.length > 0 && (
                    <ul>
                      {item.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  )}
                  {meta && <p className={item.tools?.length ? "mt-4" : ""}>{meta}</p>}
                </div>
              </div>

              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none md:grid-rows-[0fr]">
                <div className="min-h-0 overflow-hidden">
                  <div className="grid grid-cols-1 gap-4 pb-8 opacity-100 transition-opacity duration-500 md:grid-cols-[1.85fr_1fr_1fr] md:pb-10 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 motion-reduce:transition-none">
                    {images.map((image, i) => (
                      <div
                        key={i}
                        className={`relative h-64 overflow-hidden rounded-2xl bg-white/10 lg:h-[22rem] ${
                          i === 0 ? "" : "hidden md:block"
                        }`}
                      >
                        <Image
                          src={urlFor(image)
                            .width(i === 0 ? 1000 : 640)
                            .height(700)
                            .fit("crop")
                            .auto("format")
                            .url()}
                          alt={image.alt ?? `${item.companyName} project image ${i + 1}`}
                          fill
                          sizes={i === 0 ? "(min-width: 768px) 46vw, 100vw" : "25vw"}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </Link>
        );
      })}
    </div>
  );
}

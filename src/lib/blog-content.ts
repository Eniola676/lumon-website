import type { PortableTextBlock } from "@portabletext/react";

export type TocItem = { id: string; text: string; level: 2 | 3 };

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section"
  );
}

function blockText(block: PortableTextBlock): string {
  if (!Array.isArray(block.children)) return "";
  return block.children
    .map((child) => (typeof child.text === "string" ? child.text : ""))
    .join("")
    .trim();
}

// Walks the post's Portable Text blocks for h2/h3 headings and assigns each
// a stable, unique anchor id — used both for the sidebar table of contents
// and as the `id` prop the same headings render with in the article body
// (see PortableTextComponents in portable-text-components.tsx).
export function getToc(blocks: PortableTextBlock[] | undefined): TocItem[] {
  if (!blocks) return [];

  const toc: TocItem[] = [];
  const usedIds = new Set<string>();

  for (const block of blocks) {
    if (block._type !== "block") continue;
    if (block.style !== "h2" && block.style !== "h3") continue;

    const text = blockText(block) || "Section";
    const base = slugify(text);
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) {
      id = `${base}-${suffix}`;
      suffix++;
    }
    usedIds.add(id);

    toc.push({ id, text, level: block.style === "h2" ? 2 : 3 });
  }

  return toc;
}

// Maps each heading block's _key to the anchor id computed above, so the
// PortableText renderer can look up the right id per block without
// recomputing slugs (and risking a different result / duplicate suffixing).
export function getHeadingIds(blocks: PortableTextBlock[] | undefined): Map<string, string> {
  const toc = getToc(blocks);
  const headingBlocks = (blocks ?? []).filter(
    (b) => b._type === "block" && (b.style === "h2" || b.style === "h3")
  );

  const map = new Map<string, string>();
  headingBlocks.forEach((block, i) => {
    if (toc[i] && typeof block._key === "string") {
      map.set(block._key, toc[i].id);
    }
  });
  return map;
}

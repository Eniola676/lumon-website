import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import type { PostImage } from "@/lib/blog";

type TableRow = { _key: string; cells?: string[] };
type TableValue = { rows?: TableRow[] };
type LinkValue = { href?: string };

// headingIds maps each h2/h3 block's Portable Text _key to the anchor id
// computed in src/lib/blog-content.ts, so the table of contents can
// actually jump to the right place in the rendered article.
export function getPortableTextComponents(
  headingIds: Map<string, string>
): PortableTextComponents {
  return {
    block: {
      h2: ({ children, value }) => (
        <h2
          id={value._key ? headingIds.get(value._key) : undefined}
          className="mt-10 mb-4 scroll-mt-28 text-2xl leading-[1.2] font-normal tracking-tight text-[#1d1f2c]"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3
          id={value._key ? headingIds.get(value._key) : undefined}
          className="mt-8 mb-3 scroll-mt-28 text-xl font-medium text-[#1d1f2c]"
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 border-l-2 border-black pl-4 text-gray-600 italic">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => <p className="mt-4 first:mt-0">{children}</p>,
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => (
        <code className="rounded bg-[#fbfbfb] px-1.5 py-0.5 font-mono text-sm">
          {children}
        </code>
      ),
      link: ({ children, value }: { children: React.ReactNode; value?: LinkValue }) => {
        const href = value?.href ?? "#";
        const isExternal = /^https?:\/\//.test(href);
        return (
          <a
            href={href}
            className="underline underline-offset-2 hover:text-black"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },
    types: {
      image: ({ value }: { value: PostImage }) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value).width(1600).auto("format").url()}
          alt={value.alt ?? ""}
          loading="lazy"
          className="mt-6 h-auto w-full rounded-2xl"
        />
      ),
      tableBlock: ({ value }: { value: TableValue }) => {
        const rows = value.rows ?? [];
        const [headerRow, ...bodyRows] = rows;
        return (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              {headerRow && (
                <thead>
                  <tr>
                    {(headerRow.cells ?? []).map((cell, i) => (
                      <th
                        key={i}
                        className="border border-[#e9e9ea] bg-[#fbfbfb] p-3 text-left font-medium"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row) => (
                  <tr key={row._key}>
                    {(row.cells ?? []).map((cell, i) => (
                      <td key={i} className="border border-[#e9e9ea] p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      },
    },
  };
}

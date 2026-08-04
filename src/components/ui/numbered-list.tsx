import Link from "next/link";

export type NumberedItem = {
  title: string;
  description: string;
  meta?: string;
  href?: string;
};

export function NumberedList({ items }: { items: NumberedItem[] }) {
  return (
    <div className="divide-y divide-[#e9e9ea] border-t border-[#e9e9ea]">
      {items.map((item, i) => (
        <div
          key={item.title}
          className="grid grid-cols-1 gap-2 py-8 sm:grid-cols-[3rem_1fr_1fr] sm:gap-6"
        >
          <span className="font-mono text-sm text-gray-400 italic">
            #{String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-xl font-medium sm:text-2xl">
              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </h3>
            {item.meta && (
              <p className="mt-2 font-mono text-xs tracking-wide text-gray-500 uppercase">
                {item.meta}
              </p>
            )}
          </div>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

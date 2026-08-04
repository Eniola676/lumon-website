import { Placeholder } from "@/components/ui/placeholder";

export function PortfolioPanel({
  items,
  columns,
}: {
  items: string[];
  columns?: 1 | 2 | 3;
}) {
  const cols = columns ?? (items.length > 1 ? 2 : 1);

  return (
    <div className="rounded-3xl bg-[#070707] p-6 sm:p-10">
      <div
        className={`grid grid-cols-1 gap-6 ${
          cols === 3 ? "sm:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : ""
        }`}
      >
        {items.map((label) => (
          <div
            key={label}
            className="rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-2"
          >
            <Placeholder label={label} dark className="min-h-[220px] border-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

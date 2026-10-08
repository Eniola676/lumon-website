import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// Droppable inside Sanity post bodies as a custom Portable Text block (see
// schemaTypes/blockContent.ts's "calculatorCta" member and
// portable-text-components.tsx's types.calculatorCta), so editors can place
// a link to the pricing tool wherever it's contextually relevant in an
// article instead of only at the bottom of the page.
export function CalculatorCTA({ heading }: { heading?: string }) {
  return (
    <Link
      href="/tools/course-price-calculator"
      className="group mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#070707] p-6 text-white transition-colors hover:bg-[#1f1f1f]"
    >
      <div>
        <p className="font-mono text-xs tracking-wide text-white/50 uppercase">Free tool</p>
        <p className="mt-1 text-lg font-medium">
          {heading || "What should your course actually cost?"}
        </p>
        <p className="mt-1 text-sm text-white/60">
          Run the free course price calculator — no email required.
        </p>
      </div>
      <ArrowUpRight className="size-5 shrink-0 text-white/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
    </Link>
  );
}

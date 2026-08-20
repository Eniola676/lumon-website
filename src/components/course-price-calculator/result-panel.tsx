"use client";

import { cn } from "@/lib/utils";
import { formatUSD, buildLeadFields } from "@/lib/course-price-calculator/logic";
import type { CalculationResult, CompleteAnswers } from "@/lib/course-price-calculator/types";
import { useCountUp } from "./use-count-up";
import { EmailCapture } from "./email-capture";

const FLAG_STYLES = {
  warning: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  positive: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  info: "border-white/15 bg-white/5 text-white/80",
} as const;

export function ResultPanel({
  answers,
  result,
  onRestart,
}: {
  answers: CompleteAnswers;
  result: CalculationResult;
  onRestart: () => void;
}) {
  const low = useCountUp(result.low);
  const high = useCountUp(result.high);
  const anchor = useCountUp(result.anchor);

  const leadFields = buildLeadFields(answers, result);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-[#070707] p-6 text-white shadow-2xl shadow-black/25 ring-1 ring-white/10 sm:p-10">
        <p className="font-mono text-xs tracking-wide text-white/50 uppercase">Your price range</p>
        <p className="mt-3 text-4xl leading-[1.1] font-normal tracking-tight sm:text-6xl">
          {formatUSD(low)} <span className="text-white/30">–</span> {formatUSD(high)}
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-black">
          <span className="text-xs uppercase tracking-wide text-black/50">Suggested price</span>
          <span className="text-lg font-medium">{formatUSD(anchor)}</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">{result.paymentPlan}</p>

        {result.flags.length > 0 && (
          <div className="mt-6 space-y-3">
            {result.flags.map((flag) => (
              <p
                key={flag.message}
                className={cn(
                  "rounded-2xl border p-4 text-sm leading-relaxed sm:text-base",
                  FLAG_STYLES[flag.tone],
                )}
              >
                {flag.message}
              </p>
            ))}
          </div>
        )}

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="font-mono text-xs tracking-wide text-white/50 uppercase">Why this number</p>
          <ul className="mt-3 space-y-2">
            {result.whyThisNumber.map((line) => (
              <li key={line} className="flex gap-2 text-sm leading-relaxed text-white/70 sm:text-base">
                <span className="text-white/30">—</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/40">{result.footnote}</p>

        <button
          type="button"
          onClick={onRestart}
          className="mt-6 text-sm font-medium text-white/50 underline underline-offset-4 transition-colors hover:text-white"
        >
          Start over
        </button>
      </div>

      <EmailCapture leadFields={leadFields} />
    </div>
  );
}

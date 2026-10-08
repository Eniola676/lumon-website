"use client";

import { useState } from "react";
import { PLATFORM_COSTS_COPY } from "@/lib/course-price-calculator/constants";
import { calculateBreakEven, formatUSD } from "@/lib/course-price-calculator/logic";

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-white/60">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
      />
    </label>
  );
}

export function PlatformCosts({ high }: { high: number }) {
  const [open, setOpen] = useState(false);
  const [platformFee, setPlatformFee] = useState("");
  const [emailToolFee, setEmailToolFee] = useState("");
  const [otherToolsFee, setOtherToolsFee] = useState("");
  const [studentsPerMonth, setStudentsPerMonth] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-8 w-full rounded-2xl border border-dashed border-white/20 p-4 text-sm font-medium text-white/60 transition-colors hover:border-white/40 hover:text-white"
      >
        {PLATFORM_COSTS_COPY.toggleLabel}
      </button>
    );
  }

  const { breakEvenPrice } = calculateBreakEven({
    platformFee: parseFloat(platformFee) || 0,
    emailToolFee: parseFloat(emailToolFee) || 0,
    otherToolsFee: parseFloat(otherToolsFee) || 0,
    studentsPerMonth: parseFloat(studentsPerMonth) || 0,
  });

  return (
    <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6">
      <p className="font-mono text-xs tracking-wide text-white/50 uppercase">
        {PLATFORM_COSTS_COPY.heading}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/60">{PLATFORM_COSTS_COPY.body}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
          label={PLATFORM_COSTS_COPY.platformFeeLabel}
          value={platformFee}
          onChange={setPlatformFee}
        />
        <NumberField
          label={PLATFORM_COSTS_COPY.emailToolFeeLabel}
          value={emailToolFee}
          onChange={setEmailToolFee}
        />
        <NumberField
          label={PLATFORM_COSTS_COPY.otherToolsFeeLabel}
          value={otherToolsFee}
          onChange={setOtherToolsFee}
        />
        <NumberField
          label={PLATFORM_COSTS_COPY.studentsPerMonthLabel}
          value={studentsPerMonth}
          onChange={setStudentsPerMonth}
        />
      </div>

      {breakEvenPrice !== null ? (
        <div className="mt-6 border-t border-white/10 pt-5">
          <p className="font-mono text-xs tracking-wide text-white/50 uppercase">
            {PLATFORM_COSTS_COPY.breakEvenLabel}
          </p>
          <p className="mt-2 text-3xl font-normal tracking-tight">{formatUSD(breakEvenPrice)}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {breakEvenPrice > high
              ? PLATFORM_COSTS_COPY.aboveRangeMessage
              : PLATFORM_COSTS_COPY.belowRangeMessage}
          </p>
        </div>
      ) : (
        (platformFee || emailToolFee || otherToolsFee) && (
          <p className="mt-6 border-t border-white/10 pt-5 text-sm text-white/50">
            {PLATFORM_COSTS_COPY.needsStudentsMessage}
          </p>
        )
      )}
    </div>
  );
}

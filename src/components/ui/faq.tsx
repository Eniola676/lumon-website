"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[#e9e9ea]">
      {items.map((item, i) => (
        <div key={item.q} className="py-6">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 text-left"
            aria-expanded={open === i}
          >
            <span className="text-base font-medium sm:text-lg">
              {item.q}
            </span>
            <ChevronDown
              className={`size-5 shrink-0 transition-transform duration-200 ${
                open === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {open === i && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

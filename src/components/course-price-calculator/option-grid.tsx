"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Option = {
  id: string;
  label: string;
  sublabel?: string;
};

export function OptionGrid({
  legend,
  options,
  selectedId,
  onSelect,
}: {
  legend: string;
  options: Option[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = options.findIndex((o) => o.id === selectedId);
    return idx === -1 ? 0 : idx;
  });

  function focusIndex(nextIndex: number) {
    const clamped = (nextIndex + options.length) % options.length;
    setActiveIndex(clamped);
    refs.current[clamped]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusIndex(index + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusIndex(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusIndex(0);
        break;
      case "End":
        event.preventDefault();
        focusIndex(options.length - 1);
        break;
    }
  }

  return (
    <fieldset className="border-0 p-0">
      <legend className="sr-only">{legend}</legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option, index) => {
          const selected = option.id === selectedId;
          return (
            <button
              key={option.id}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={index === activeIndex ? 0 : -1}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => onSelect(option.id)}
              className={cn(
                "flex min-h-[4.5rem] w-full flex-col items-start justify-center gap-0.5 rounded-2xl border px-5 py-4 text-left transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none",
                selected
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/[0.04] text-white hover:border-white/40",
              )}
            >
              <span className="text-base font-medium sm:text-lg">{option.label}</span>
              {option.sublabel && (
                <span
                  className={cn(
                    "text-sm",
                    selected ? "text-black/60" : "text-white/50",
                  )}
                >
                  {option.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

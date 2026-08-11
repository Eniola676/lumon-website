"use client";

import { AI_TOOLS } from "@/lib/ai-tools";

export function AiSummaryLinks({
  label = "Explore us in AI tools:",
  variant = "dark",
}: {
  label?: string;
  variant?: "dark" | "light";
}) {
  function openTool(buildUrl: (prompt: string) => string) {
    const prompt = `Summarize this page for me: ${window.location.href}`;
    window.open(buildUrl(prompt), "_blank", "noopener,noreferrer");
  }

  const isDark = variant === "dark";

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className={`text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}>
        {label}
      </span>
      <div className="flex items-center gap-3">
        {AI_TOOLS.map((tool) => (
          <button
            key={tool.name}
            type="button"
            onClick={() => openTool(tool.buildUrl)}
            aria-label={`Summarize this page with ${tool.name}`}
            title={`Summarize this page with ${tool.name}`}
            className={`flex size-8 items-center justify-center rounded-lg transition-colors ${
              isDark
                ? "bg-white/10 hover:bg-white/20"
                : "bg-[#fbfbfb] hover:bg-[#e9e9ea]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.icon}
              alt=""
              loading="lazy"
              className={`size-4 ${isDark ? "[filter:brightness(0)_invert(1)]" : ""}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

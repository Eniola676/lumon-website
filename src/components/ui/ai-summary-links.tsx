"use client";

import { AI_TOOLS } from "@/lib/ai-tools";

export function AiSummaryLinks() {
  function openTool(buildUrl: (prompt: string) => string) {
    const prompt = `Summarize this page for me: ${window.location.href}`;
    window.open(buildUrl(prompt), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="text-sm text-white/50">Explore us in AI tools:</span>
      <div className="flex items-center gap-3">
        {AI_TOOLS.map((tool) => (
          <button
            key={tool.name}
            type="button"
            onClick={() => openTool(tool.buildUrl)}
            aria-label={`Summarize this page with ${tool.name}`}
            title={`Summarize this page with ${tool.name}`}
            className="flex size-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tool.icon}
              alt=""
              loading="lazy"
              className="size-4 [filter:brightness(0)_invert(1)]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

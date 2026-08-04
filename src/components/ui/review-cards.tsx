"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Stars } from "@/components/ui/stars";
import { WistiaEmbed } from "@/components/ui/wistia-embed";
import type { MuxVideoReview, TextReview } from "@/lib/reviews";
import type { Testimonial } from "@/lib/testimonials";

const CARD = "mb-6 break-inside-avoid overflow-hidden rounded-2xl border border-[#e9e9ea] bg-white";

export function MuxVideoCard({ name, role, videoUrl, poster, text, rating }: MuxVideoReview) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={CARD}>
      <div className="relative aspect-[3/4] bg-black">
        {playing ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group block h-full w-full"
            aria-label={`Play testimonial from ${name}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-110">
                <Play className="ml-0.5 size-5 fill-current" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4 text-left">
              <Stars count={rating} className="text-white" />
              <span className="mt-1.5 block font-medium text-white">{name}</span>
              <span className="block text-sm text-white/70">{role}</span>
            </span>
          </button>
        )}
      </div>
      {text && (
        <p className="p-4 text-sm leading-relaxed text-gray-700">{text}</p>
      )}
    </div>
  );
}

export function WistiaVideoCard({ mediaId, aspect, transcript }: Testimonial) {
  return (
    <div className={CARD}>
      <WistiaEmbed mediaId={mediaId} aspect={aspect} transcript={transcript} />
      <p className="p-4 text-sm leading-relaxed text-gray-700">{transcript}</p>
    </div>
  );
}

export function TextReviewCard({ name, platform, text, rating }: TextReview) {
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
          {name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="font-mono text-xs tracking-wide text-gray-400 uppercase">
            {platform}
          </p>
        </div>
      </div>
      <Stars count={rating} className="mt-3 text-black" />
      <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-gray-700">
        {text}
      </p>
    </div>
  );
}

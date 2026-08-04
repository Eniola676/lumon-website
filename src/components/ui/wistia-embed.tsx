"use client";

import Script from "next/script";

export function WistiaEmbed({
  mediaId,
  aspect,
  transcript,
  className,
}: {
  mediaId: string;
  aspect: number;
  transcript: string;
  className?: string;
}) {
  const paddingTop = `${(100 / aspect).toFixed(2)}%`;

  return (
    <div className={["bg-black", className].filter(Boolean).join(" ")}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        strategy="afterInteractive"
        type="module"
      />
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: ${paddingTop};
        }
      `}</style>
      <wistia-player media-id={mediaId} aspect={String(aspect)}>
        <div
          className="wistia_preload_transcript_outer_wrapper"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: `-${paddingTop}`,
          }}
        >
          <div
            className="wistia_preload_transcript_inner_wrapper"
            style={{ overflow: "auto" }}
          >
            <p
              className="wistia_preload_transcript_text"
              aria-hidden="true"
              tabIndex={-1}
              style={{ textAlign: "justify", fontSize: "5px" }}
            >
              {transcript}
            </p>
          </div>
        </div>
      </wistia-player>
    </div>
  );
}

import { ImageResponse } from "next/og";

export const alt = "Online Course Price Calculator — Lumon Studios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070707",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }}>
          LUMON STUDIOS
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Free Tool
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 500, color: "#ffffff", lineHeight: 1.1 }}>
            Online Course Price Calculator
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.6)" }}>
            Answer a few questions. Get a data-backed price range.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

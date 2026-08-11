// Deliberately non-throwing: the site (and even the /studio route module
// graph) must still build cleanly before a Sanity project has been created.
// Consumers (src/sanity/client.ts, sanity.config.ts) check for an empty
// projectId and degrade gracefully / show a clear message instead.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-01";

if (!projectId && typeof window === "undefined") {
  console.warn(
    "NEXT_PUBLIC_SANITY_PROJECT_ID is not set — blog pages will render empty until it is configured."
  );
}

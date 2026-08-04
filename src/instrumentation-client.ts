import posthog from "posthog-js";

if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: "history_change",
    capture_pageleave: true,
    person_profiles: "identified_only",
  });

  // Exposed for debugging in the browser console (e.g. posthog.capture(...)).
  // The npm/ESM install method doesn't do this automatically like the
  // old <script> snippet loader did.
  if (typeof window !== "undefined") {
    window.posthog = posthog;
  }
}

"use client";

import { useEffect } from "react";

const CALENDLY_CSS_HREF = "https://assets.calendly.com/assets/external/widget.css";

export function CalendlyAssets() {
  useEffect(() => {
    if (document.querySelector(`link[href="${CALENDLY_CSS_HREF}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = CALENDLY_CSS_HREF;
    document.head.appendChild(link);
  }, []);

  return null;
}

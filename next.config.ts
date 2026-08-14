import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Canonicalize on www — search engines were seeing lumonstudio.xyz and
  // www.lumonstudio.xyz as two separate sites. permanent:true emits a 308,
  // which browsers/search engines treat identically to a 301 (Next.js
  // doesn't support literal 301s — see the redirects() docs).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lumonstudio.xyz" }],
        destination: "https://www.lumonstudio.xyz/:path*",
        permanent: true,
      },
    ];
  },
  // PostHog reverse proxy — routes analytics through our own domain so
  // ad blockers don't strip event capture. Switch us.* to eu.* below if
  // the PostHog project is on the EU cloud.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;

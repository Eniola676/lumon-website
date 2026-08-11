import { createClient, type SanityClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "./env";

// null when the project isn't configured yet — every query helper in
// src/lib/blog.ts checks for this and returns an empty result instead of
// throwing, so the site still builds/renders before Sanity is set up.
export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

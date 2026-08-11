import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { dataset, projectId } from "./env";

const builder = sanityClient
  ? createImageUrlBuilder(sanityClient)
  : createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

import { Container } from "@/components/ui/container";
import {
  MuxVideoCard,
  WistiaVideoCard,
  TextReviewCard,
} from "@/components/ui/review-cards";
import { MUX_VIDEO_REVIEWS, TEXT_REVIEWS } from "@/lib/reviews";
import { TESTIMONIALS } from "@/lib/testimonials";

// Hand-ordered so video and text cards interleave reasonably evenly
// across the masonry columns instead of clustering by type.
type Item =
  | { kind: "wistia"; key: keyof typeof TESTIMONIALS }
  | { kind: "mux"; index: number }
  | { kind: "text"; index: number };

const ORDER: Item[] = [
  { kind: "wistia", key: "thinkificWebsite" },
  { kind: "text", index: 0 }, // christacourt
  { kind: "mux", index: 0 }, // Dr. Shawn Boyd
  { kind: "text", index: 1 }, // sworkz
  { kind: "mux", index: 1 }, // Dr. C. Una Eatman
  { kind: "text", index: 2 }, // melissanyarko
  { kind: "wistia", key: "ecommerceCourse" },
  { kind: "text", index: 3 }, // tatecopywriting
  { kind: "mux", index: 2 }, // Brian Jacobs
  { kind: "text", index: 4 }, // canelauna
  { kind: "mux", index: 3 }, // Daniel Bove
  { kind: "text", index: 5 }, // petewc
  { kind: "wistia", key: "repeatClient" },
  { kind: "text", index: 6 }, // soshikanlu
  { kind: "text", index: 7 }, // coach1tash
  { kind: "text", index: 8 }, // ferdifred
  { kind: "text", index: 9 }, // coryschlesinger
  { kind: "text", index: 10 }, // diegocassina
];

export function TestimonialWall() {
  return (
    <section className="bg-[#fbfbfb]">
      <Container className="py-16 sm:py-24">
        <h2 className="text-4xl leading-[1.1] font-normal tracking-tight sm:text-5xl">
          What clients <em className="italic">actually say.</em>
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Real reviews, unedited — pulled straight from Fiverr and client
          video testimonials.
        </p>

        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {ORDER.map((item, i) => {
            if (item.kind === "wistia") {
              return (
                <WistiaVideoCard key={i} {...TESTIMONIALS[item.key]} />
              );
            }
            if (item.kind === "mux") {
              return (
                <MuxVideoCard key={i} {...MUX_VIDEO_REVIEWS[item.index]} />
              );
            }
            return <TextReviewCard key={i} {...TEXT_REVIEWS[item.index]} />;
          })}
        </div>
      </Container>
    </section>
  );
}

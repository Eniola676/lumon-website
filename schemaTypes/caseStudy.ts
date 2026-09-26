import { defineArrayMember, defineField, defineType } from "sanity";

const RELATED_OFFER_OPTIONS = [
  { title: "None", value: "none" },
  { title: "Lumon Launch", value: "launch" },
  { title: "Lumon Scale", value: "scale" },
  { title: "Lumon Enterprise", value: "enterprise" },
];

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Images" },
    { name: "meta", title: "Meta & Placement" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "Internal label, e.g. \"Princess Cruises — Course Platform Build\". Also used as a fallback heading.",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientName",
      title: "Client name",
      description: "The person, e.g. \"Sophia Amoruso\".",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clientRole",
      title: "Client role",
      description: "E.g. \"Founder & CEO\".",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "companyName",
      title: "Company name",
      description: "The business or brand, e.g. \"Businessclass\".",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "Short card blurb shown in grids (homepage, offer pages, related case studies). Keep it around 160 characters.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "statHighlight",
      title: "Stat highlight",
      description: "The single headline result, e.g. \"35% increase in course completion.\" Shown prominently near the top of the page.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "projectLink",
      title: "Project link",
      description: "Link to the client's live site or project.",
      type: "url",
      group: "content",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "relatedOffer",
      title: "Related offer",
      description: "Which offer page this case study is featured on (Launch/Scale/Enterprise), and the \"Featured Service\" label shown on the page. Choose \"None\" to keep it homepage-only.",
      type: "string",
      options: { list: RELATED_OFFER_OPTIONS, layout: "dropdown" },
      initialValue: "none",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "industries",
      title: "Industries",
      description: "Which industries this project belongs to. It will be listed on each industry's page.",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "industry" }] })],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "toolsUsed",
      title: "Tools used",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "tool",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              description: "Optional — leave blank to show as a plain text tag.",
            }),
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        }),
      ],
    }),
    defineField({
      name: "theClient",
      title: "The Client",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theChallenge",
      title: "The Challenge",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatWeBuilt",
      title: "What We Built Together",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "theResults",
      title: "The Results",
      type: "blockContent",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsPossible",
      title: "What's Possible",
      description: "Optional forward-looking close — what this opens up next.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              options: { list: [1, 2, 3, 4, 5] },
              initialValue: 5,
              validation: (Rule) => Rule.required().min(1).max(5),
            }),
            defineField({
              name: "avatar",
              title: "Avatar",
              type: "image",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "quote", media: "avatar" },
          },
        }),
      ],
    }),
    defineField({
      name: "clientImage",
      title: "Client image",
      description: "Headshot of the client.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) =>
        Rule.required().custom((value) =>
          (value as { asset?: unknown } | undefined)?.asset ? true : "Upload the client image (alt text alone is not enough)"
        ),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      description: "Hero/banner image for the case study.",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) =>
        Rule.required().custom((value) =>
          (value as { asset?: unknown } | undefined)?.asset ? true : "Upload the cover image (alt text alone is not enough)"
        ),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      description: "Photos (animated GIFs work fine here too) or short video clips.",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          title: "Image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              validation: (Rule) => Rule.required(),
            },
          ],
        }),
        defineArrayMember({
          type: "object",
          name: "galleryVideo",
          title: "Video",
          fields: [
            defineField({
              name: "file",
              title: "Video file",
              type: "file",
              options: { accept: "video/*" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "poster",
              title: "Poster image",
              description: "Optional thumbnail shown before the video plays.",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "caption",
              title: "Caption / alt text",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "caption", media: "poster" },
            prepare({ title, media }) {
              return { title: title || "Video", media };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      description: "Show this case study in the homepage's case study grid.",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    defineField({
      name: "featuredOnWebsiteDesign",
      title: "Show on Website Design page",
      description:
        "List this case study in the expanding project list on the /website-design page. Uses the cover image plus the first two gallery images on hover.",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    defineField({
      name: "brandColor",
      title: "Brand colour (Website Design page)",
      description:
        "Hex colour the project's row turns into when hovered on the /website-design page, e.g. #E8684A. Use the client's main brand colour. Text switches between white and black automatically for contrast. Blank falls back to Lumon blue.",
      type: "string",
      group: "meta",
      hidden: ({ document }) => !document?.featuredOnWebsiteDesign,
      validation: (Rule) =>
        Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
          name: "hex colour",
          invert: false,
        }).error("Use a hex colour like #E8684A"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "Shown in search results. Keep it around 160 characters.",
      type: "text",
      rows: 3,
      group: "meta",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description:
        "Case study only appears on the site once this date/time has passed. Set it in the future to schedule ahead of time.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      companyName: "companyName",
      media: "clientImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, companyName, media, publishedAt }) {
      const scheduled = publishedAt && new Date(publishedAt) > new Date();
      return {
        title: title || companyName,
        subtitle: [companyName, scheduled ? `Scheduled: ${new Date(publishedAt).toLocaleDateString()}` : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});

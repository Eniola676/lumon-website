import { defineField, defineType } from "sanity";

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Placement & SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Name",
      description: "The industry, e.g. \"Coaches & Consultants\" or \"Healthcare Training\".",
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
      name: "headline",
      title: "Page headline (optional)",
      description:
        "H1 on the industry page. Leave blank to use \"Website design for {Name}\". Put the words people actually search in here.",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Card blurb on the Industries page and the fallback meta description. Around 160 characters.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "intro",
      title: "Intro copy",
      description:
        "Shown above the projects on the industry page. 2–4 short paragraphs on what this industry needs from its website and how you build for it. This is the main SEO copy for the page.",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "Optional. Used as the social share image for the industry page.",
      type: "image",
      options: { hotspot: true },
      group: "content",
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "coreIndustry",
      title: "Core industry (show in footer)",
      description: "Tick to list this industry in the site footer on every page. Keep it to your 4–6 main industries.",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      description: "Lower numbers come first in the footer and on the Industries page. Blank sorts last, alphabetically.",
      type: "number",
      group: "meta",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title (optional)",
      description: "Overrides the browser/search title. Leave blank for \"Website Design for {Name} | Lumon Studios\".",
      type: "string",
      group: "meta",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description (optional)",
      description: "Falls back to the short description. Keep it around 160 characters.",
      type: "text",
      rows: 3,
      group: "meta",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", core: "coreIndustry", media: "image" },
    prepare({ title, core, media }) {
      return { title, subtitle: core ? "Core · in footer" : undefined, media };
    },
  },
});

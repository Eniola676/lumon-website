import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      description: "Shown in search results and used as the card excerpt. Keep it around 160 characters.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title (optional)",
      description: "Overrides the browser/search title. Leave blank to use the post title.",
      type: "string",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description (optional)",
      description: "Overrides the meta description shown in search results. Leave blank to use the meta description above.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Sales Funnels",
          "Course Platforms",
          "Automation",
          "Marketing",
          "Systems & Operations",
          "Case Studies",
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "pinterestUrl",
      title: "Pinterest URL",
      description: "Link to the Pinterest post for this article, added manually.",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      description: "Up to 3 posts to show in the \"More from the blog\" block at the bottom of this post. Leave empty to fall back to posts in the same category.",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      validation: (Rule) => Rule.max(3).unique(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      description:
        "Post only appears on the site once this date/time has passed — this is how scheduling works on the free plan. Set it in the future to schedule a post ahead of time.",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      media: "mainImage",
      publishedAt: "publishedAt",
    },
    prepare({ title, category, media, publishedAt }) {
      const scheduled = publishedAt && new Date(publishedAt) > new Date();
      return {
        title,
        subtitle: [category, scheduled ? `Scheduled: ${new Date(publishedAt).toLocaleDateString()}` : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});

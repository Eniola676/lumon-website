import { defineArrayMember, defineField, defineType } from "sanity";

// Hand-rolled table type — Sanity has no first-party table block, and this
// keeps rendering fully under our control (rendered as a real <table> via
// the custom PortableText component, not a plugin's own markup).
export const tableBlock = defineType({
  name: "tableBlock",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "tableRow",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare({ cells }: { cells?: string[] }) {
              return { title: (cells ?? []).join(" | ") || "Empty row" };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error("Add at least one row."),
    }),
  ],
  preview: {
    select: { rows: "rows" },
    prepare({ rows }: { rows?: { cells?: string[] }[] }) {
      return {
        title: "Table",
        subtitle: `${rows?.length ?? 0} row(s)`,
      };
    },
  },
});

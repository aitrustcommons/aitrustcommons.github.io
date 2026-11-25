// The six posts, read byte for byte from src/content/posts/.
// There is no title field: each post's title comes from its first heading,
// through src/markdown/remark-post-header.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({
    pattern: '*.md',
    base: './src/content/posts',
    generateId: ({ data }) => String(data.slug),
  }),
  schema: z.object({
    date: z.coerce.date(),
    slug: z.string(),
    description: z.string(),
    categories: z.array(z.string()).default([]),
    authors: z.array(z.string()).default([]),
    image: z.string().optional(),
  }),
});

export const collections = { posts };

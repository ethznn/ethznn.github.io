import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const stories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stories' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    featured: z.boolean(),
    order: z.number().int().positive(),
    topics: z.array(z.string().min(1)).min(1),
    metric: z.string().min(1),
    publicScope: z.literal('approved-public'),
  }),
});

export const collections = { stories };

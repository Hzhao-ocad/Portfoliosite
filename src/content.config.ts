import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: z.object({
    title: z.object({
      en: z.string(),
      zh: z.string(),
    }),
    description: z.object({
      en: z.string(),
      zh: z.string(),
    }),
    animal: z.string(),
    year: z.number(),
    type: z.enum(['original', 'copy']),
    material: z.string(),
    dimensions: z.string(),
    featured: z.boolean().default(false),
    images: z.array(z.string()).min(1),
    price: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works };

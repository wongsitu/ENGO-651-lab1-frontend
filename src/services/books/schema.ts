import { z } from 'zod';

export const BookSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z
    .object({
      id: z.number(),
      isbn: z.string(),
      title: z.string(),
      author: z.string(),
      year: z.number(),
    })
    .array(),
});

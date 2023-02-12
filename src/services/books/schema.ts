import { z } from 'zod';

export const BookSchema = z.object({
  id: z.number(),
  isbn: z.string(),
  title: z.string(),
  author: z.string(),
  year: z.number(),
  ratingsCount: z.number().nullable().optional(),
  averageRating: z.number().nullable().optional(),
});

export const PaginatedBookSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: BookSchema.array(),
});

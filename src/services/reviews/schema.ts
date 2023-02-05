import z from 'zod';

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export const ReviewSchema = z.object({
  id: z.number(),
  user: UserSchema,
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  rating: z.number(),
});

export const PaginatedReviewSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: ReviewSchema.array(),
});

export const CreateReviewSchema = z.object({
  success: z.boolean(),
});

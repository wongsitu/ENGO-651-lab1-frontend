import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from 'react-query';
import { z } from 'zod';
import { CreateReviewSchema, PaginatedReviewSchema } from './schema';

export type PaginatedReviewResponse = z.infer<typeof PaginatedReviewSchema>;

export interface ReviewVariableOptions
  extends Omit<
    UseInfiniteQueryOptions<
      PaginatedReviewResponse,
      unknown,
      PaginatedReviewResponse,
      PaginatedReviewResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {
  book?: string;
}

export type CreateReviewResponse = z.infer<typeof CreateReviewSchema>;

export type CreateReviewPayload = {
  title: string;
  description?: string;
  rating?: number;
  book?: string;
};

export interface CreateReviewVariables
  extends Omit<
    UseMutationOptions<
      CreateReviewResponse,
      AxiosError,
      CreateReviewPayload,
      unknown
    >,
    'mutationFn' | 'mutationKey'
  > {}

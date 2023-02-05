import { MutationFunction, QueryFunction, QueryKey } from 'react-query';
import API from '../api';
import { CreateReviewSchema, PaginatedReviewSchema } from './schema';
import {
  CreateReviewResponse,
  PaginatedReviewResponse,
  CreateReviewPayload,
} from './types';

export const getReviews: QueryFunction<
  PaginatedReviewResponse,
  QueryKey
> = async ({ queryKey, pageParam }) => {
  const [, { book }] = queryKey as [unknown, { book: number }];

  return API.get(pageParam || 'api/reviews/', { params: { book } }).then(
    (result) => PaginatedReviewSchema.parse(result.data),
  );
};

export const createReview: MutationFunction<
  CreateReviewResponse,
  CreateReviewPayload
> = async (variables) =>
  API.post('api/reviews/', variables).then((result) =>
    CreateReviewSchema.parse(result.data),
  );

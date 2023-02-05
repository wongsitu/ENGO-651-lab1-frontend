import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation } from 'react-query';
import API from '../api';
import { createReview, getReviews } from './requests';
import {
  CreateReviewPayload,
  CreateReviewResponse,
  CreateReviewVariables,
  PaginatedReviewResponse,
  ReviewVariableOptions,
} from './types';

export const useReviews = ({ book, ...ops }: ReviewVariableOptions = {}) => {
  const {
    data,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<PaginatedReviewResponse>(
    ['getReviews', { book }],
    getReviews,
    {
      getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
      getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
      ...ops,
    },
  );

  const reviews = data?.pages.flatMap((el) => el?.results) || [];

  return {
    reviews,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  };
};

export const useCreateReview = ({ ...opts }: CreateReviewVariables = {}) =>
  useMutation<CreateReviewResponse, AxiosError, CreateReviewPayload>(
    'createReview',
    createReview,
    { ...opts },
  );

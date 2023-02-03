import { QueryKey, UseInfiniteQueryOptions } from 'react-query';
import { z } from 'zod';
import { BookSchema } from './schema';

export type BookResponse = z.infer<typeof BookSchema>;

export interface BooksVariableOptions
  extends Omit<
    UseInfiniteQueryOptions<
      BookResponse,
      unknown,
      BookResponse,
      BookResponse,
      QueryKey
    >,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'getPreviousPageParam'
  > {
  search?: string;
  isbn?: string;
  title?: string;
  author?: string;
  year?: string;
  id?: number;
}

import { AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from 'react-query';
import { z } from 'zod';
import { BookSchema, PaginatedBookSchema } from './schema';

export type PaginatedBookResponse = z.infer<typeof PaginatedBookSchema>;

export type BookResponse = z.infer<typeof BookSchema>;

export interface BooksVariableOptions
  extends Omit<
    UseInfiniteQueryOptions<
      PaginatedBookResponse,
      unknown,
      PaginatedBookResponse,
      PaginatedBookResponse,
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

export interface BookVariables
  extends Omit<
    UseQueryOptions<BookResponse, AxiosError, BookResponse, QueryKey>,
    'queryFn'
  > {
  bookId?: string;
}

import { QueryFunction, QueryKey } from 'react-query';
import API from '../api';
import { BookSchema, PaginatedBookSchema } from './schema';
import { BookResponse, PaginatedBookResponse } from './types';

export const getBooks: QueryFunction<PaginatedBookResponse, QueryKey> = async ({
  queryKey,
  pageParam,
}) => {
  const [, variables] = queryKey as [unknown, unknown];

  return API.get(pageParam || 'api/books/', { params: variables }).then(
    (result) => PaginatedBookSchema.parse(result.data),
  );
};

export const getBook: QueryFunction<BookResponse, QueryKey> = async ({
  queryKey,
}) => {
  const [, { bookId }] = queryKey as [unknown, { bookId: number }];

  return API.get(`api/books/${bookId}/`).then((result) =>
    BookSchema.parse(result.data),
  );
};

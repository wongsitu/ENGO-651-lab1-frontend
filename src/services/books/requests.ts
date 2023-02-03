import { QueryFunction, QueryKey } from 'react-query';
import API from '../api';
import { BookSchema } from './schema';
import { BookResponse } from './types';

export const getBooks: QueryFunction<BookResponse, QueryKey> = async ({
  queryKey,
}) => {
  const [, variables] = queryKey as [unknown, unknown];

  return API.get('books/', { params: variables }).then((result) =>
    BookSchema.parse(result.data),
  );
};

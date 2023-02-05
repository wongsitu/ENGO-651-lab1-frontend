import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { getBook, getBooks } from './requests';
import {
  PaginatedBookResponse,
  BooksVariableOptions,
  BookVariables,
  BookResponse,
} from './types';

export const useBooks = ({
  search,
  isbn,
  year,
  title,
  author,
  id,
  ...ops
}: BooksVariableOptions = {}) => {
  const { data, status, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<PaginatedBookResponse>(
      ['getBooks', { id, search, isbn, year, title, author }],
      getBooks,
      {
        getNextPageParam: (lastPage) => lastPage?.next ?? undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous ?? undefined,
        ...ops,
      },
    );

  const books = data?.pages.flatMap((el) => el?.results) || [];

  return {
    books,
    status,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export const useBookDetail = ({ bookId, ...opts }: BookVariables = {}) => {
  const { status, refetch, data } = useQuery<BookResponse, AxiosError>(
    ['getBook', { bookId }],
    getBook,
    {
      ...opts,
    },
  );

  return { status, refetch, data };
};

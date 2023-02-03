import { useInfiniteQuery } from 'react-query';
import { getBooks } from './requests';
import { BookResponse, BooksVariableOptions } from './types';

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
    useInfiniteQuery<BookResponse>(
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

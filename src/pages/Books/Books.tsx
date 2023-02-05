import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import PrivateRoute from '../../components/PrivateRoute';
import useDebounce from '../../hooks/useDebounce';
import { useBooks } from '../../services/books';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const searchKey = useDebounce(searchTerm);
  const { books, status, hasNextPage, fetchNextPage } = useBooks({
    search: searchKey,
    keepPreviousData: true,
  });

  const [ref] = useInfiniteScroll({
    loading: status === 'loading',
    hasNextPage: !!hasNextPage,
    disabled: status === 'error',
    onLoadMore: fetchNextPage,
    rootMargin: '0px 0px 37px 0px',
  });

  return (
    <PrivateRoute>
      <div className="flex items-center justify-center h-screen bg-gray-700">
        <div className="container">
          <div className="p-6 rounded-lg shadow-xl border border-solid border-gray-400 bg-gray-200 dark:bg-gray-900">
            <h1 className="text-xl font-bold mb-2 text-white">Search Book</h1>
            <input
              type="text"
              className="p-2 border-2 w-full mb-6 bg-gray-700 dark:text-gray-400 sm:rounded-lg"
              placeholder="Search book by isbn, name, author or year"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <div className="overflow-auto h-72">
              {books.length > 0 ? (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          id
                        </th>
                        <th scope="col" className="px-6 py-3">
                          isbn
                        </th>
                        <th scope="col" className="px-6 py-3">
                          title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          author
                        </th>
                        <th scope="col" className="px-6 py-3">
                          year
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr
                          key={book.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {book.id}
                          </th>
                          <td className="px-6 py-4">{book.isbn}</td>
                          <td className="px-6 py-4">{book.title}</td>
                          <td className="px-6 py-4">{book.author}</td>
                          <td className="px-6 py-4">{book.year}</td>
                          <td className="px-6 py-4 text-right">
                            <Link to={`/books/${book.id}`}>View Detail</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {hasNextPage && <div className="w-full" ref={ref} />}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  No results
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Books;

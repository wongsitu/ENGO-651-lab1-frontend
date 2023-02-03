// import PrivateRoute from '../../components/PrivateRoute';
// import { useBooks } from '../../services/books';

// const Books = () => {
//   const { books } = useBooks();

//   return (
//     <PrivateRoute>
//       <div className="flex items-center justify-center h-screen">
//         <div className="bg-white p-6 rounded-lg shadow-xl border border-solid border-gray-400">
//           <h1 className="text-lg font-medium mb-2">Book List</h1>
//           <div>
//             {books.map((book) => (
//               <div key={book.id}>{book.title}</div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </PrivateRoute>
//   );
// };

// export default Books;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import useDebounce from '../../hooks/useDebounce';
import { useBooks } from '../../services/books';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchKey = useDebounce(searchTerm);
  const { books } = useBooks({
    search: searchKey,
  });

  return (
    <PrivateRoute>
      <div className="flex items-center justify-center h-screen">
        <div className="container">
          <div className="bg-white p-6 rounded-lg shadow-xl border border-solid border-gray-400">
            <div className="overflow-auto h-96">
              <input
                type="text"
                className="p-2 border-2 w-full mb-6 bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sm:rounded-lg"
                placeholder="Search book by isbn, name, author or year"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Books;

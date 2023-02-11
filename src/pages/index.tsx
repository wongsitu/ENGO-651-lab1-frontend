import { Route, Routes } from 'react-router-dom';
import BookDetail from './BookDetail';
import Books from './Books';
import Login from './Login';
import NotFound from './NotFound';
import Register from './Register';

const Pages = () => (
  <Routes>
    <Route path="/" index element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="books" element={<Books />} />
    <Route path="books/:isbn" element={<BookDetail />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Pages;

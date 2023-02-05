import { Route, Routes } from 'react-router-dom';
import BookDetail from './BookDetail';
import Books from './Books';
import Login from './Login';
import Register from './Register';

const Pages = () => (
  <Routes>
    <Route path="/" index element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="books" element={<Books />} />
    <Route path="books/:id" element={<BookDetail />} />
  </Routes>
);

export default Pages;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QueryClientProvider } from 'react-query';
import Register from './pages/Register';
import Login from './pages/Login';
import queryClient from './services/queryClient';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

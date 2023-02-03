import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QueryClientProvider } from 'react-query';

import queryClient from './services/queryClient';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import Navbar from './components/Navbar';
import Pages from './pages';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Pages />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

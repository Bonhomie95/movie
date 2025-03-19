import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrowseAllPage from './pages/BrowseAllPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminHomePage from './pages/AdminHomePage';
import AdminSearchPage from './pages/AdminSearchPage';
import AdminEditPage from './pages/AdminEditPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/browse" element={<BrowseAllPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard/*" element={<AdminDashboard />}>
        <Route path="home" element={<AdminHomePage />} />
        <Route path="search" element={<AdminSearchPage />} />
        <Route path="edit/:id" element={<AdminEditPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  return (
    <div
      className={`bg-gray-900 text-white h-screen flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 fixed`}
    >
      <nav className="flex flex-col flex-grow mt-4">
        <Link
          to="/admin/dashboard/home"
          className="p-4 hover:bg-gray-800 flex items-center"
        >
          <span role="img" aria-label="home">
            🏠
          </span>
          {!isCollapsed && <span className="ml-3">Home</span>}
        </Link>
        <Link
          to="/admin/dashboard/search"
          className="p-4 hover:bg-gray-800 flex items-center"
        >
          <span role="img" aria-label="search">
            🔍
          </span>
          {!isCollapsed && <span className="ml-3">Search</span>}
        </Link>
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full p-4 hover:bg-red-600 flex items-center cursor-pointer"
        >
          <span role="img" aria-label="logout">
            🚪
          </span>
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;

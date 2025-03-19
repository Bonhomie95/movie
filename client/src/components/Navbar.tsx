import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
      {/* Logo/Name redirects to the homepage */}
      <Link to="/" className="text-2xl font-bold text-gray-300 hover:text-blue-400">
        MyMovieApp
      </Link>
      <div className="space-x-4">
        {/* Movies redirects to /browse with ?cat=movie */}
        <Link
          to="/browse?cat=movie"
          className="text-gray-300 hover:text-blue-400 cursor-pointer"
        >
          Movies
        </Link>
        {/* Series redirects to /browse with ?cat=series */}
        <Link
          to="/browse?cat=series"
          className="text-gray-300 hover:text-blue-400 cursor-pointer"
        >
          Series
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

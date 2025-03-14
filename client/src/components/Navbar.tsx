import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
      <div className="text-2xl font-bold">MyMovieApp</div>
      <div className="space-x-4">
        <button className="text-gray-300 hover:text-blue-400 cursor-pointer">Movies</button>
        <button className="text-gray-300 hover:text-blue-400 cursor-pointer">Series</button>
      </div>
    </nav>
  );
};

export default Navbar;

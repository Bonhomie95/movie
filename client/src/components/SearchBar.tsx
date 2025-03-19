import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../constants/movies';

interface SearchBarProps {
  movies: Movie[];
}

const SearchBar: React.FC<SearchBarProps> = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Only filter if query length >= 3 and limit to 20 suggestions
  const filteredMovies =
    searchQuery.length >= 3
      ? movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 20)
      : [];

  return (
    <div className="w-full max-w-md relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search movies..."
        className="w-full p-3 pr-10 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-gray-400"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.15z"
          />
        </svg>
      </div>
      {searchQuery.length >= 3 && (
        <div className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded mt-2 max-h-60 overflow-y-auto z-10">
          {filteredMovies.length > 0 ? (
            <ul>
              {filteredMovies.map((movie) => (
                <li
                  key={movie.id}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    navigate(`/movie/${movie.id}`);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{movie.title}</p>
                      <p className="text-xs text-gray-400">
                        {movie.quality === 'Full HD' ? 'UHD' : movie.quality}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-gray-400">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

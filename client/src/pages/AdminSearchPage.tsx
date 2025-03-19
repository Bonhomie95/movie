import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Movie {
  _id: string;
  title: string;
  image: string;
  quality: string;
  // Add additional fields as needed…
}

const AdminSearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchResults = async () => {
      // Only search if query has at least 3 characters
      if (query.length < 3) {
        setResults([]);
        return;
      }
      try {
        const res = await fetch(
          `${backendUrl}/api/movies/search?q=${encodeURIComponent(query)}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch results');
        }
        const data = await res.json();
        // Limit results to 20 (if not already limited by backend)
        setResults(data.slice(0, 20));
      } catch (error) {
        console.error(error);
      }
    };

    // Debounce search requests
    const timeoutId = setTimeout(() => {
      fetchResults();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query, backendUrl]);

  const handleModify = (movieId: string) => {
    navigate(`/admin/dashboard/edit/${movieId}`);
  };

  const handleDelete = (movieId: string) => {
    // For now, just alert; later you would call a delete API endpoint
    alert(`Delete movie with id: ${movieId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="w-full p-2 rounded border bg-gray-800 text-white"
      />
      <div className="mt-4">
        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((movie) => (
              <li
                key={movie._id}
                className="flex items-center justify-between bg-gray-700 p-4 rounded"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-bold">{movie.title}</h2>
                    <p className="text-sm text-gray-300">
                      {movie.quality === 'Full HD' ? 'UHD' : movie.quality}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleModify(movie._id)}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          query.length >= 3 && <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminSearchPage;

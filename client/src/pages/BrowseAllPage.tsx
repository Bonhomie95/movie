import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 20;

interface Movie {
  _id: string;
  title: string;
  image: string;
  quality: string;
  type: 'movie' | 'series';
  uploadDate: string;
  releaseDate: string;
  // Add additional fields as needed…
}

const BrowseAllPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the category from the query parameter
  const paramCat = searchParams.get('cat') as 'movie' | 'series' | null;
  const initialCat = paramCat ? paramCat : 'all';
  const [category, setCategory] = useState<'all' | 'movie' | 'series'>(
    initialCat
  );
  const [sortBy, setSortBy] = useState<'uploadDate' | 'releaseDate'>(
    'uploadDate'
  );
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Update category state when query parameter changes
  useEffect(() => {
    const newCat = searchParams.get('cat') as 'movie' | 'series' | null;
    setCategory(newCat ? newCat : 'all');
  }, [searchParams]);

  // Fetch movies from DB whenever filters or page changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Build query string
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          sortBy,
          order,
        });
        if (category !== 'all') {
          queryParams.append('cat', category);
        }
        const response = await fetch(
          `${backendUrl}/api/movies?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data.movies);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [category, sortBy, order, currentPage]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Pagination Handlers
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Responsive Header with Filter Options */}
      <div className="bg-gray-800 p-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Category Toggle Buttons */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            {(['all', 'movie', 'series'] as const).map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded cursor-pointer ${
                  category === cat
                    ? 'bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                onClick={() => {
                  setCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          {/* Filter Options */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
            <div className="w-full md:w-auto">
              <label htmlFor="sortBy" className="block md:inline mr-2">
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as 'uploadDate' | 'releaseDate');
                  setCurrentPage(1);
                }}
                className="w-full md:w-auto bg-gray-700 text-white p-2 rounded"
              >
                <option value="uploadDate">Upload Date</option>
                <option value="releaseDate">Release Date</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <label htmlFor="order" className="block md:inline mr-2">
                Order:
              </label>
              <select
                id="order"
                value={order}
                onChange={(e) => {
                  setOrder(e.target.value as 'asc' | 'desc');
                  setCurrentPage(1);
                }}
                className="w-full md:w-auto bg-gray-700 text-white p-2 rounded"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-700"
              onClick={() => navigate(`/movie/${item._id}`)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{item.title}</h3>
                <span className="text-sm text-gray-400">
                  {item.quality === 'Full HD' ? 'UHD' : item.quality}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded cursor-pointer disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseAllPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

interface Movie {
  _id: string;
  title: string;
  image: string;
  quality: string;
  // ... other fields as needed
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/movies?limit=20`
        );
        if (res.ok) {
          const data = await res.json();
          setMovies(data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center">
        <SearchBar movies={movies} />
        <div className="mt-4">
          <button
            onClick={() => navigate('/browse')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Browse All
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

interface MovieLink {
  link: string;
  source: string;
}

interface Comment {
  username: string;
  comment: string;
  date: string;
}

interface Movie {
  _id: string;
  title: string;
  image: string;
  movieLinks: MovieLink[];
  genre: string[];
  cast: string[];
  description: string;
  imdbRating: number;
  releaseDate: string;
  quality: string;
  duration: number;
  director: string[];
  comments?: Comment[];
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState(0);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  const [suggestions, setSuggestions] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/movies/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch movie');
        }
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, backendUrl]);

  // Fetch suggested movies (excluding the current movie)
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        if (!movie) return;
        const res = await fetch(
          `${backendUrl}/api/movies/suggestions?exclude=${movie._id}&limit=10`
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSuggestions();
  }, [movie, backendUrl]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!movie) return <p className="text-center text-white">Movie not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Video Player using the selected movie source */}
      <VideoPlayer videoSource={movie.movieLinks[selectedSource].link} />

      {/* Movie Source Buttons */}
      <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
        {movie.movieLinks.map((sourceObj, index) => (
          <button
            key={index}
            onClick={() => setSelectedSource(index)}
            className={`px-4 py-2 rounded cursor-pointer ${
              index === selectedSource
                ? 'bg-blue-600'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {sourceObj.source}
          </button>
        ))}
      </div>

      {/* Movie Details Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Smaller Poster Image Container */}
          <div className="md:w-1/6">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
          {/* Movie Details */}
          <div className="md:w-3/4 space-y-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="bg-gray-700 px-4 py-2 rounded-lg text-sm">
                Quality: {movie.quality === 'Full HD' ? 'UHD' : movie.quality}
              </span>
              <span className="bg-yellow-500 px-4 py-2 rounded-lg text-sm text-black font-semibold">
                IMDB: {movie.imdbRating}
              </span>
            </div>
            <p className="text-gray-300">{movie.description}</p>
            <div className="text-gray-400">
              📅 Release Date:{' '}
              {new Date(movie.releaseDate).toLocaleDateString()}
            </div>
            <div className="text-gray-400">
              🎭 Genre: {movie.genre.join(', ')}
            </div>
            <div className="text-gray-400">
              🎬 Cast: {movie.cast.join(', ')}
            </div>
            <div className="text-gray-400">
              🎥 Director: {movie.director.join(', ')}
            </div>
            <div className="text-gray-400">
              ⏳ Duration: {movie.duration} min
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Movies Section */}
      {suggestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Suggested Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                className="bg-gray-800 p-4 rounded shadow cursor-pointer hover:bg-gray-700"
                onClick={() => {
                  // Navigate to the movie details page
                  window.location.href = `/movie/${suggestion._id}`;
                }}
              >
                <img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm">{suggestion.title}</h3>
                  <span className="text-sm text-gray-400">
                    {suggestion.quality === 'Full HD'
                      ? 'UHD'
                      : suggestion.quality}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;

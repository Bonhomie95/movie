import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

interface Episode {
  episodeNumber: number;
  title: string;
  videoLinks: { link: string }[];
  duration: number;
}

interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

interface Movie {
  _id: string;
  title: string;
  image: string;
  // For movies:
  movieLinks?: MovieLink[];
  // For series:
  seasons?: Season[];
  type: 'movie' | 'series';
  genre: string[];
  cast: string[];
  description: string;
  imdbRating: number;
  releaseDate: string;
  quality: string;
  duration?: number;
  director: string[];
  comments?: Comment[];
}

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // For movies:
  const [selectedSource, setSelectedSource] = useState(0);
  // For series:
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [selectedEpisode, setSelectedEpisode] = useState(0);

  // Fetch movie details from DB
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

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!movie) return <p className="text-center text-white">Movie not found.</p>;

  // Determine the video source to play
  let videoSource = '';
  if (movie.type === 'movie' && movie.movieLinks) {
    videoSource = movie.movieLinks[selectedSource].link;
  } else if (
    movie.type === 'series' &&
    movie.seasons &&
    movie.seasons.length > 0
  ) {
    const currentSeason = movie.seasons[selectedSeason];
    if (currentSeason.episodes && currentSeason.episodes.length > 0) {
      videoSource = currentSeason.episodes[selectedEpisode].videoLinks[0].link;
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Navbar />
      <div className="mb-4" />
      {/* Video Player */}
      <VideoPlayer videoSource={videoSource} />

      {/* Source/Episode Selection */}
      {movie.type === 'movie' && movie.movieLinks && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {movie.movieLinks.map((sourceObj, index) => (
            <button
              key={index}
              onClick={() => setSelectedSource(index)}
              className={`cursor-pointer px-4 py-2 rounded ${
                index === selectedSource
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {sourceObj.source}
            </button>
          ))}
        </div>
      )}

      {movie.type === 'series' && movie.seasons && (
        <div className="mt-4 flex flex-col items-center">
          {/* Season Selection */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {movie.seasons.map((season, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedSeason(index);
                  setSelectedEpisode(0); // reset episode selection
                }}
                className={`px-4 py-2 rounded ${
                  index === selectedSeason
                    ? 'bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Season {season.seasonNumber}
              </button>
            ))}
          </div>
          {/* Episode Selection */}
          {movie.seasons[selectedSeason].episodes && (
            <div className="flex flex-wrap gap-2 justify-center">
              {movie.seasons[selectedSeason].episodes.map((episode, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedEpisode(index)}
                  className={`px-4 py-2 rounded ${
                    index === selectedEpisode
                      ? 'bg-blue-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Ep {episode.episodeNumber}: {episode.title || 'Untitled'}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Movie Details Card */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full rounded-lg shadow-md"
            />
          </div>
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
            {movie.type === 'movie' && movie.duration && (
              <div className="text-gray-400">
                ⏳ Duration: {movie.duration} min
              </div>
            )}
            {movie.type === 'series' && movie.seasons && (
              <div className="text-gray-400">
                Total Seasons: {movie.seasons.length}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Movies Section (optional) */}
      {/* You could add a suggested movies section here if desired */}

      <div className="mt-4" />
      <Footer />
    </div>
  );
};

export default MovieDetailsPage;

import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { popularMovies } from '../constants/movies';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center">
        <SearchBar movies={popularMovies} />
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

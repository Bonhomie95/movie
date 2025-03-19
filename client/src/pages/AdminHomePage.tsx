import React, { useState } from 'react';

const AdminHomePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'movie' | 'series'>('movie'); // New field for type
  const [image, setImage] = useState('');
  const [movieLinks, setMovieLinks] = useState([{ link: '', source: '' }]);
  const [genre, setGenre] = useState('');
  const [cast, setCast] = useState('');
  const [description, setDescription] = useState('');
  const [imdbRating, setImdbRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [quality, setQuality] = useState('HD');
  const [duration, setDuration] = useState('');
  const [director, setDirector] = useState('');
  const [subtitles, setSubtitles] = useState([
    { link: '', language: 'English' },
  ]);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Handlers for movie links
  const handleAddMovieLink = () => {
    setMovieLinks([...movieLinks, { link: '', source: '' }]);
  };
  const handleMovieLinkChange = (
    index: number,
    field: 'link' | 'source',
    value: string
  ) => {
    const newLinks = [...movieLinks];
    newLinks[index][field] = value;
    setMovieLinks(newLinks);
  };
  const handleRemoveMovieLink = (index: number) => {
    const newLinks = [...movieLinks];
    newLinks.splice(index, 1);
    setMovieLinks(newLinks);
  };

  // Handlers for subtitles
  const handleSubtitleChange = (
    index: number,
    field: 'link' | 'language',
    value: string
  ) => {
    const newSubtitles = [...subtitles];
    newSubtitles[index][field] = value;
    setSubtitles(newSubtitles);
  };
  const handleAddSubtitle = () => {
    setSubtitles([...subtitles, { link: '', language: 'English' }]);
  };
  const handleRemoveSubtitle = (index: number) => {
    const newSubtitles = [...subtitles];
    newSubtitles.splice(index, 1);
    setSubtitles(newSubtitles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const castArray = cast.split(',').map((s) => s.trim());
    const genreArray = genre.split(',').map((s) => s.trim());
    const directorArray = director.split(',').map((s) => s.trim());
    const newMovie = {
      title,
      type, // Include the type field
      image,
      movieLinks,
      genre: genreArray,
      cast: castArray,
      description,
      imdbRating: Number(imdbRating),
      releaseDate,
      quality,
      duration: Number(duration),
      director: directorArray,
      subtitles,
    };

    try {
      const response = await fetch(`${backendUrl}/api/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie),
      });
      if (response.ok) {
        alert('Movie uploaded successfully!');
        // Reset form fields
        setTitle('');
        setType('movie');
        setImage('');
        setMovieLinks([{ link: '', source: '' }]);
        setGenre('');
        setCast('');
        setDescription('');
        setImdbRating('');
        setReleaseDate('');
        setQuality('HD');
        setDuration('');
        setDirector('');
        setSubtitles([{ link: '', language: 'English' }]);
      } else {
        alert('Failed to upload movie');
      }
    } catch (error) {
      console.error(error);
      alert('Error uploading movie');
    }
  };

  return (
    <div className="p-6 bg-gray-100 text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Upload New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {/* Type: Movie or Series */}
        <div>
          <label className="block font-semibold">Type</label>
          <select
            className="w-full p-2 rounded border"
            value={type}
            onChange={(e) => setType(e.target.value as 'movie' | 'series')}
            required
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        {/* Image URL */}
        <div>
          <label className="block font-semibold">Image URL</label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        {/* Movie Links Section */}
        <div>
          <label className="block font-semibold">Movie Links (Sources)</label>
          {movieLinks.map((item, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Movie Link"
                className="w-1/2 p-2 rounded bg-gray-700 border text-white"
                value={item.link}
                onChange={(e) =>
                  handleMovieLinkChange(index, 'link', e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Source (e.g. Mega, Drive...)"
                className="w-1/2 p-2 rounded bg-gray-700 border text-white"
                value={item.source}
                onChange={(e) =>
                  handleMovieLinkChange(index, 'source', e.target.value)
                }
                required
              />
              {movieLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMovieLink(index)}
                  className="bg-red-600 px-2 rounded hover:bg-red-700"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMovieLink}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Add More Links
          </button>
        </div>
        {/* Genre */}
        <div>
          <label className="block font-semibold">Genre (comma separated)</label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        {/* Cast */}
        <div>
          <label className="block font-semibold">Cast (comma separated)</label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={cast}
            onChange={(e) => setCast(e.target.value)}
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full p-2 rounded border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* IMDB Rating */}
        <div>
          <label className="block font-semibold">IMDB Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            className="w-full p-2 rounded border"
            value={imdbRating}
            onChange={(e) => setImdbRating(e.target.value)}
            required
          />
        </div>
        {/* Release Date */}
        <div>
          <label className="block font-semibold">Release Date</label>
          <input
            type="date"
            className="w-full p-2 rounded border"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
        </div>
        {/* Quality */}
        <div>
          <label className="block font-semibold">Quality</label>
          <select
            className="w-full p-2 rounded border"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="HD">HD</option>
            <option value="Full HD">Full HD</option>
            <option value="UHD">UHD</option>
          </select>
        </div>
        {/* Duration */}
        <div>
          <label className="block font-semibold">Duration (in minutes)</label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 150"
            required
          />
        </div>
        {/* Director */}
        <div>
          <label className="block font-semibold">
            Director (comma separated)
          </label>
          <input
            type="text"
            className="w-full p-2 rounded border"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            required
          />
        </div>
        {/* Subtitles Section */}
        <div className="bg-gray-800 p-3 rounded mt-4">
          <label className="block font-bold mb-2">Subtitles</label>
          {subtitles.map((item, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Subtitle Link"
                className="w-1/2 p-2 rounded bg-gray-700 border text-white"
                value={item.link}
                onChange={(e) =>
                  handleSubtitleChange(index, 'link', e.target.value)
                }
                required
              />
              <select
                className="w-1/2 p-2 rounded bg-gray-700 border text-white"
                value={item.language}
                onChange={(e) =>
                  handleSubtitleChange(index, 'language', e.target.value)
                }
                required
              >
                {['English', 'Spanish', 'Italian', 'French', 'Portuguese'].map(
                  (lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  )
                )}
              </select>
              {subtitles.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSubtitle(index)}
                  className="bg-red-600 px-2 rounded hover:bg-red-700"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSubtitle}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Add More Subtitles
          </button>
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload Movie
        </button>
      </form>
    </div>
  );
};

export default AdminHomePage;

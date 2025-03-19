// POST /api/movies - Create a new movie
import { Router, Request, Response } from 'express';
import { Movie } from '../models/Movie';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const {
      title,
      image,
      movieLinks,
      genre,
      cast,
      description,
      imdbRating,
      releaseDate,
      quality,
      duration,
      director,
      subtitles,
      type,
    } = req.body;

    // Basic validation (expand as needed)
    if (!title || !image || !movieLinks || !genre || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMovie = new Movie({
      title,
      image,
      movieLinks,
      genre,
      cast,
      description,
      imdbRating,
      releaseDate,
      quality,
      duration,
      director,
      subtitles,
      type,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving movie' });
  }
});
// GET /api/movies/search?q=...
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string' || q.length < 3) {
      return res.json([]); // Return empty array if query is too short
    }
    // Use a regular expression for a case-insensitive search on the title
    const regex = new RegExp(q, 'i');
    const movies = await Movie.find({ title: { $regex: regex } }).limit(20);
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});
// GET /api/movies with pagination and filtering (if needed)
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const sortBy =
      req.query.sortBy === 'releaseDate' ? 'releaseDate' : 'uploadDate';
    const order = req.query.order === 'asc' ? 1 : -1;
    const cat = req.query.cat as string | undefined;
    const filter: any = {};
    if (cat && (cat === 'movie' || cat === 'series')) {
      filter.type = cat;
    }
    const totalCount = await Movie.countDocuments(filter);
    const movies = await Movie.find(filter)
      .sort({ [sortBy]: order })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({ movies, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// PUT /api/movies/:id – Update a movie
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update movie' });
  }
});

// GET /api/movies/suggestions?exclude=<movieId>&limit=10
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const { exclude, limit } = req.query;
    const query: any = {};
    if (exclude && typeof exclude === 'string') {
      query._id = { $ne: exclude }; // Exclude this movie
    }
    const movies = await Movie.find(query).limit(
      parseInt(limit as string) || 10
    );
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

// GET /api/movies/:id – Get movie details by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

export default router;

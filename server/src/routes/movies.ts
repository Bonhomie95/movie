import { Router } from 'express';
import { Movie } from '../models/movie';

const router = Router();

// GET /api/movies - List all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies.' });
  }
});

// GET /api/movies/:id - Get a specific movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie.' });
  }
});

// POST /api/movies - Create a new movie entry
router.post('/', async (req, res) => {
  try {
    const { title, description, megaUrl } = req.body;
    const newMovie = new Movie({ title, description, megaUrl });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Error creating movie.' });
  }
});

export default router;

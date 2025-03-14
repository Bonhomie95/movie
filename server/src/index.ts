import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import movieRoutes from './routes/movies';

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/streaming-movie-app';

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Base route for API
app.get('/', (req, res) => {
  res.send('Streaming Movie App API');
});

// Use movie routes
app.use('/api/movies', movieRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

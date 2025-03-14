import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 5000;
const mongoUri =
  process.env.MONGODB_URI ||
  'mongodb+srv://joe:Done123@cluster0.fczza.mongodb.net/streaming-movie-app';

app.use(express.json());

mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Streaming Movie App API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

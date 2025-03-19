import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import adminRoutes from './routes/admin';
import movieRoutes from './routes/movies';
import path from 'path';

dotenv.config();
const app = express();

// Enable CORS for your frontend origin
app.use(cors({ origin: 'http://localhost:5173' }));

// app.use(express.static(path.join(__dirname, '../../client/')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../client', 'index.html'));
// });

app.use(express.json());

const mongoUri =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/streaming-movie-app';

// Connect to MongoDB
mongoose
  .connect(mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mount routes
app.use('/api/admin', adminRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

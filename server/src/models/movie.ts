import { Schema, model, Document } from 'mongoose';

interface IMovieLink {
  link: string;
  source: string;
}

export interface IMovie extends Document {
  title: string;
  image: string;
  movieLinks: { link: string; source: string }[];
  genre: string[];
  type: string;
  cast: string[];
  description: string;
  imdbRating: number;
  releaseDate: Date;
  quality: string;
  duration: number;
  director: string[];
  comments?: { username: string; comment: string; date: Date }[];
  createdAt?: Date; // Add this line
}


const MovieLinkSchema = new Schema<IMovieLink>({
  link: { type: String, required: true },
  source: { type: String, required: true },
});

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  movieLinks: { type: [MovieLinkSchema], required: true },
  genre: { type: [String], default: [] },
  type: { type: String, required: true },
  cast: { type: [String], default: [] },
  description: { type: String, required: true },
  imdbRating: { type: Number, default: 0 },
  releaseDate: { type: Date },
  quality: { type: String, default: 'HD' },
  duration: { type: Number, default: 0 },
  director: { type: [String], default: [] },
  comments: { type: [{ username: String, comment: String, date: Date }], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Movie = model<IMovie>('Movie', MovieSchema);

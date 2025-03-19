import { Schema, model, Document } from 'mongoose';

interface IMovieLink {
  link: string;
  source: string;
}

interface IEpisode {
  episodeNumber: number;
  title: string;
  videoLinks: IMovieLink[]; // Optionally allow multiple sources per episode
  duration: number; // Duration in minutes
}

interface ISeason {
  seasonNumber: number;
  episodes: IEpisode[];
}

interface ISubtitleLink {
  link: string;
  language: string;
}

export interface IMovie extends Document {
  title: string;
  image: string;
  movieLinks?: IMovieLink[]; // for movies
  genre: string[];
  type: 'movie' | 'series';
  cast: string[];
  description: string;
  imdbRating: number;
  releaseDate: Date;
  quality: string;
  duration?: number;
  director: string[];
  subtitles?: { link: string; source: string }[];
  seasons?: ISeason[];
  comments?: { username: string; comment: string; date: Date }[];
  createdAt?: Date;
}

const MovieLinkSchema = new Schema<IMovieLink>({
  link: { type: String, required: true },
  source: { type: String, required: true },
});

const EpisodeSchema = new Schema<IEpisode>({
  episodeNumber: { type: Number, required: true },
  title: { type: String },
  videoLinks: { type: [MovieLinkSchema], required: true },
  duration: { type: Number, required: true },
});

const SeasonSchema = new Schema<ISeason>({
  seasonNumber: { type: Number, required: true },
  episodes: { type: [EpisodeSchema], default: [] },
});

const SubtitleSchema = new Schema<ISubtitleLink>({
  link: { type: String, required: true },
  language: { type: String, required: true },
});

const MovieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  image: { type: String, required: true },
  movieLinks: { type: [MovieLinkSchema], required: true },
  genre: { type: [String], default: [] },
  type: { type: String, enum: ['movie', 'series'], required: true },
  cast: { type: [String], default: [] },
  description: { type: String, required: true },
  imdbRating: { type: Number, default: 0 },
  releaseDate: { type: Date },
  quality: { type: String, default: 'HD' },
  duration: { type: Number, default: 0 },
  director: { type: [String], default: [] },
  subtitles: { type: [SubtitleSchema], default: [] },
  seasons: { type: [SeasonSchema], default: [] },
  comments: {
    type: [{ username: String, comment: String, date: Date }],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

export const Movie = model<IMovie>('Movie', MovieSchema);

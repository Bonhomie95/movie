import { Schema, model, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  description?: string;
  megaUrl: string;
  createdAt: Date;
}

const movieSchema = new Schema<IMovie>({
  title: { type: String, required: true },
  description: { type: String },
  megaUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Movie = model<IMovie>('Movie', movieSchema);
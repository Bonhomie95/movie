import { Schema, model, Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  password: string; // In production, use a hashed password.
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Admin = model<IAdmin>('Admin', AdminSchema);

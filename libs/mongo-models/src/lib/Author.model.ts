import { Schema, model } from 'mongoose';
import { Author } from '@ms-learning/author-service-proto';

const authorSchema = new Schema<Author>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Authors = model<Author>('author', authorSchema);

import { Schema, model } from 'mongoose';
import { Book } from '@ms-learning/book-service-proto';

const bookSchema = new Schema<Book>(
  {
    name: { type: String, required: true },
    authorId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Books = model<Book>('book', bookSchema);

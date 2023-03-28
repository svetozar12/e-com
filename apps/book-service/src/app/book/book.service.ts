import { Injectable } from '@nestjs/common';
import { Books } from '@ms-learning/mongo-models';
import {
  Book,
  BookById,
  UpdateBookRequest,
  UpdateBookResponse,
  CreateBookRequest,
  GetByIdResponse,
  CreateBookResponse,
  DeleteBookRequest,
  Empty,
} from '@ms-learning/book-service-proto';
@Injectable()
export class BookService {
  async getById({ _id }: BookById): Promise<GetByIdResponse> {
    const book = await Books.findById(_id).exec();
    return { book };
  }
  async getList(): Promise<{ books: Book[] }> {
    const books = await Books.find().exec();
    return { books };
  }
  async createBook({ name }: CreateBookRequest): Promise<CreateBookResponse> {
    const book = await Books.create({ name });
    book.save();
    return { book };
  }
  async updateBook({ book }: UpdateBookRequest): Promise<UpdateBookResponse> {
    const newBook = await Books.findOneAndUpdate(book).exec();
    return { book: newBook };
  }
  async deleteBook({ _id }: DeleteBookRequest): Promise<Empty> {
    await Books.deleteOne({ _id }).exec();
    return {};
  }
}

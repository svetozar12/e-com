import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  BookById,
  CreateBookRequest,
  DeleteBookRequest,
  GetListRequest,
  UpdateBookRequest,
} from '@ms-learning/book-service-proto';
@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @GrpcMethod('BookService', 'FindOne')
  GetById(args: BookById) {
    return this.bookService.getById(args);
  }
  @GrpcMethod('BookService', 'GetList')
  GetList(args: GetListRequest) {
    return this.bookService.getList(args);
  }
  @GrpcMethod('BookService', 'CreateBook')
  CreateBook(args: CreateBookRequest) {
    return this.bookService.createBook(args);
  }
  @GrpcMethod('BookService', 'UpdateBook')
  UpdateBook(args: UpdateBookRequest) {
    return this.bookService.updateBook(args);
  }
  @GrpcMethod('BookService', 'DeleteBook')
  DeleteBook(args: DeleteBookRequest) {
    return this.bookService.deleteBook(args);
  }
}

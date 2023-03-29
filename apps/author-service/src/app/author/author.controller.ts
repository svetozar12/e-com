import { Controller } from '@nestjs/common';
import { AuthorService } from './author.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  BookById,
  CreateBookRequest,
  DeleteBookRequest,
  UpdateBookRequest,
} from '@ms-learning/book-service-proto';
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}
  @GrpcMethod('AuthorService', 'FindOne')
  GetById(args: BookById) {
    return this.authorService.getById(args);
  }
  @GrpcMethod('AuthorService', 'GetList')
  GetList() {
    return this.authorService.getList();
  }
  @GrpcMethod('AuthorService', 'CreateBook')
  CreateBook(args: CreateBookRequest) {
    return this.authorService.createBook(args);
  }
  @GrpcMethod('AuthorService', 'UpdateBook')
  UpdateBook(args: UpdateBookRequest) {
    return this.authorService.updateBook(args);
  }
  @GrpcMethod('AuthorService', 'DeleteBook')
  DeleteBook(args: DeleteBookRequest) {
    return this.authorService.deleteBook(args);
  }
}

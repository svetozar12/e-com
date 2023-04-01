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
  @GrpcMethod('AuthorService', 'GetById')
  GetById(args: BookById) {
    return this.authorService.getById(args);
  }
  @GrpcMethod('AuthorService', 'GetList')
  GetList() {
    return this.authorService.getList();
  }
  @GrpcMethod('AuthorService', 'CreateAuthor')
  CreateBook(args: CreateBookRequest) {
    return this.authorService.createAuthor(args);
  }
  @GrpcMethod('AuthorService', 'UpdateAuthor')
  UpdateBook(args: UpdateBookRequest) {
    return this.authorService.updateAuthor(args);
  }
  @GrpcMethod('AuthorService', 'DeleteAuthor')
  DeleteBook(args: DeleteBookRequest) {
    return this.authorService.deleteBook(args);
  }
}

import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { BookById } from '@ms-learning/book-service-proto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('BookService', 'FindOne')
  findOne(data: BookById) {
    return this.appService.getData(data);
  }
}

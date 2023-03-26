import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('BookService', 'FindOne')
  findOne() {
    return this.appService.getData({ id: 1 });
  }
}

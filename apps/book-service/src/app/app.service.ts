import { Injectable } from '@nestjs/common';
import { Book, BookById } from '@ms-learning/book-service-proto';
@Injectable()
export class AppService {
  getData(args: BookById): Book {
    return { id: 1, name: 'good book' };
  }
}

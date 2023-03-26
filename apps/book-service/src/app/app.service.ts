import { Injectable } from '@nestjs/common';
import { Book, BookById } from '@ms-learning/book-service-proto';
import { Books } from '@ms-learning/mongo-models';
@Injectable()
export class AppService {
  async getData({ _id }: BookById): Promise<Book> {
    return Books.findById(_id).exec();
  }
}

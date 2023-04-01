import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { resolve } from 'path';
import { connectMongo } from '@ms-learning/mongo-models';
import { bookEnvs } from '@ms-learning/book-service-env';
async function bootstrap() {
  const { BOOK_SERVICE_MONGO_URL, BOOK_SERVICE_HOST, BOOK_SERVICE_PORT } =
    bookEnvs();
  await connectMongo(BOOK_SERVICE_MONGO_URL);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'book.v1',
        protoPath: resolve(
          'libs/protos/book-service-proto/src/lib/book.v1.proto'
        ),
        url: `${BOOK_SERVICE_HOST}:${BOOK_SERVICE_PORT}`,
      },
    }
  );
  await app.listen();
  Logger.log(
    `🚀 Book Service is running on: ${BOOK_SERVICE_HOST}:${BOOK_SERVICE_PORT}`
  );
}

bootstrap();

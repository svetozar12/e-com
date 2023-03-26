import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { resolve } from 'path';
import { connectMongo } from '@ms-learning/mongo-models';
async function bootstrap() {
  await connectMongo('mongodb://localhost:27017');
  const url = '0.0.0.0:1000';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'book.v1',
        protoPath: resolve(
          'libs/protos/book-service-proto/src/lib/book.v1.proto'
        ),
        url,
      },
    }
  );
  await app.listen();
  Logger.log(`🚀 Application is running on: ${url}`);
}

bootstrap();

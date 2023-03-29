import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { resolve } from 'path';
import { connectMongo } from '@ms-learning/mongo-models';
import { authorEnvs } from '@ms-learning/envs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const { AUTHOR_SERVICE_HOST, AUTHOR_SERVICE_PORT, AUTHOR_SERVICE_MONGO_URL } =
    authorEnvs();
  await connectMongo(AUTHOR_SERVICE_MONGO_URL);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'author.v1',
        protoPath: resolve(
          'libs/protos/author-service-proto/src/lib/author.v1.proto'
        ),
        url: `${AUTHOR_SERVICE_HOST}:${AUTHOR_SERVICE_PORT}`,
      },
    }
  );
  await app.listen();
  Logger.log(
    `🚀 Author Service is running on: ${AUTHOR_SERVICE_HOST}:${AUTHOR_SERVICE_PORT}`
  );
}

bootstrap();

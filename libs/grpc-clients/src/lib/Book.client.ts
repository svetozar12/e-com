import { resolve } from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import {
  ProtoGrpcType,
  BookServiceClient,
} from '@ms-learning/book-service-proto';
const packageDefinition = protoLoader.loadSync(
  resolve('libs/protos/book-service-proto/src/lib/book.v1.proto')
);
// const bookProto: ProtoGrpcType = grpc.loadPackageDefinition(packageDefinition);
// const client = new bookProto.book.v1.BookService(
//   'localhost:1000',
//   grpc.credentials.createInsecure()
// );
// client.FindOne({ id: 1 }, function (err, response) {
//   console.log('Data:', response); // API response
//   console.log(err);
// });

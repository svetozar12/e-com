// Original file: lib/book.v1.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Book as _book_v1_Book, Book__Output as _book_v1_Book__Output } from '../../book/v1/Book';
import type { BookById as _book_v1_BookById, BookById__Output as _book_v1_BookById__Output } from '../../book/v1/BookById';

export interface BookServiceClient extends grpc.Client {
  FindOne(argument: _book_v1_BookById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _book_v1_BookById, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _book_v1_BookById, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  FindOne(argument: _book_v1_BookById, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  findOne(argument: _book_v1_BookById, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  findOne(argument: _book_v1_BookById, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  findOne(argument: _book_v1_BookById, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  findOne(argument: _book_v1_BookById, callback: grpc.requestCallback<_book_v1_Book__Output>): grpc.ClientUnaryCall;
  
}

export interface BookServiceHandlers extends grpc.UntypedServiceImplementation {
  FindOne: grpc.handleUnaryCall<_book_v1_BookById__Output, _book_v1_Book>;
  
}

export interface BookServiceDefinition extends grpc.ServiceDefinition {
  FindOne: MethodDefinition<_book_v1_BookById, _book_v1_Book, _book_v1_BookById__Output, _book_v1_Book__Output>
}

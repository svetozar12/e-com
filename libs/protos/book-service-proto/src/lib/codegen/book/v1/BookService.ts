// Original file: lib/book.v1.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateBookRequest as _book_v1_CreateBookRequest, CreateBookRequest__Output as _book_v1_CreateBookRequest__Output } from '../../book/v1/CreateBookRequest';
import type { CreateBookResponse as _book_v1_CreateBookResponse, CreateBookResponse__Output as _book_v1_CreateBookResponse__Output } from '../../book/v1/CreateBookResponse';
import type { DeleteBookRequest as _book_v1_DeleteBookRequest, DeleteBookRequest__Output as _book_v1_DeleteBookRequest__Output } from '../../book/v1/DeleteBookRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../../google/protobuf/Empty';
import type { GetByIdResponse as _book_v1_GetByIdResponse, GetByIdResponse__Output as _book_v1_GetByIdResponse__Output } from '../../book/v1/GetByIdResponse';
import type { GetListResponse as _book_v1_GetListResponse, GetListResponse__Output as _book_v1_GetListResponse__Output } from '../../book/v1/GetListResponse';
import type { UpdateBookRequest as _book_v1_UpdateBookRequest, UpdateBookRequest__Output as _book_v1_UpdateBookRequest__Output } from '../../book/v1/UpdateBookRequest';
import type { UpdateBookResponse as _book_v1_UpdateBookResponse, UpdateBookResponse__Output as _book_v1_UpdateBookResponse__Output } from '../../book/v1/UpdateBookResponse';

export interface BookServiceClient extends grpc.Client {
  CreateBook(argument: _book_v1_CreateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _book_v1_CreateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _book_v1_CreateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  CreateBook(argument: _book_v1_CreateBookRequest, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _book_v1_CreateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _book_v1_CreateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _book_v1_CreateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  createBook(argument: _book_v1_CreateBookRequest, callback: grpc.requestCallback<_book_v1_CreateBookResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteBook(argument: _book_v1_DeleteBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteBook(argument: _book_v1_DeleteBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteBook(argument: _book_v1_DeleteBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteBook(argument: _book_v1_DeleteBookRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteBook(argument: _book_v1_DeleteBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteBook(argument: _book_v1_DeleteBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteBook(argument: _book_v1_DeleteBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteBook(argument: _book_v1_DeleteBookRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  GetById(argument: _book_v1_GetByIdResponse, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _book_v1_GetByIdResponse, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _book_v1_GetByIdResponse, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _book_v1_GetByIdResponse, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _book_v1_GetByIdResponse, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _book_v1_GetByIdResponse, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _book_v1_GetByIdResponse, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _book_v1_GetByIdResponse, callback: grpc.requestCallback<_book_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  
  GetList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  GetList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  GetList(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  GetList(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_book_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateBook(argument: _book_v1_UpdateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  UpdateBook(argument: _book_v1_UpdateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  UpdateBook(argument: _book_v1_UpdateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  UpdateBook(argument: _book_v1_UpdateBookRequest, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  updateBook(argument: _book_v1_UpdateBookRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  updateBook(argument: _book_v1_UpdateBookRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  updateBook(argument: _book_v1_UpdateBookRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  updateBook(argument: _book_v1_UpdateBookRequest, callback: grpc.requestCallback<_book_v1_UpdateBookResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface BookServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateBook: grpc.handleUnaryCall<_book_v1_CreateBookRequest__Output, _book_v1_CreateBookResponse>;
  
  DeleteBook: grpc.handleUnaryCall<_book_v1_DeleteBookRequest__Output, _google_protobuf_Empty>;
  
  GetById: grpc.handleUnaryCall<_book_v1_GetByIdResponse__Output, _book_v1_GetByIdResponse>;
  
  GetList: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _book_v1_GetListResponse>;
  
  UpdateBook: grpc.handleUnaryCall<_book_v1_UpdateBookRequest__Output, _book_v1_UpdateBookResponse>;
  
}

export interface BookServiceDefinition extends grpc.ServiceDefinition {
  CreateBook: MethodDefinition<_book_v1_CreateBookRequest, _book_v1_CreateBookResponse, _book_v1_CreateBookRequest__Output, _book_v1_CreateBookResponse__Output>
  DeleteBook: MethodDefinition<_book_v1_DeleteBookRequest, _google_protobuf_Empty, _book_v1_DeleteBookRequest__Output, _google_protobuf_Empty__Output>
  GetById: MethodDefinition<_book_v1_GetByIdResponse, _book_v1_GetByIdResponse, _book_v1_GetByIdResponse__Output, _book_v1_GetByIdResponse__Output>
  GetList: MethodDefinition<_google_protobuf_Empty, _book_v1_GetListResponse, _google_protobuf_Empty__Output, _book_v1_GetListResponse__Output>
  UpdateBook: MethodDefinition<_book_v1_UpdateBookRequest, _book_v1_UpdateBookResponse, _book_v1_UpdateBookRequest__Output, _book_v1_UpdateBookResponse__Output>
}

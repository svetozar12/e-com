// Original file: lib/author.v1.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateAuthorRequest as _author_v1_CreateAuthorRequest, CreateAuthorRequest__Output as _author_v1_CreateAuthorRequest__Output } from '../../author/v1/CreateAuthorRequest';
import type { CreateAuthorResponse as _author_v1_CreateAuthorResponse, CreateAuthorResponse__Output as _author_v1_CreateAuthorResponse__Output } from '../../author/v1/CreateAuthorResponse';
import type { DeleteAuthorRequest as _author_v1_DeleteAuthorRequest, DeleteAuthorRequest__Output as _author_v1_DeleteAuthorRequest__Output } from '../../author/v1/DeleteAuthorRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../../google/protobuf/Empty';
import type { GetByIdResponse as _author_v1_GetByIdResponse, GetByIdResponse__Output as _author_v1_GetByIdResponse__Output } from '../../author/v1/GetByIdResponse';
import type { GetListResponse as _author_v1_GetListResponse, GetListResponse__Output as _author_v1_GetListResponse__Output } from '../../author/v1/GetListResponse';
import type { UpdateAuthorRequest as _author_v1_UpdateAuthorRequest, UpdateAuthorRequest__Output as _author_v1_UpdateAuthorRequest__Output } from '../../author/v1/UpdateAuthorRequest';
import type { UpdateAuthorResponse as _author_v1_UpdateAuthorResponse, UpdateAuthorResponse__Output as _author_v1_UpdateAuthorResponse__Output } from '../../author/v1/UpdateAuthorResponse';

export interface AuthorServiceClient extends grpc.Client {
  CreateAuthor(argument: _author_v1_CreateAuthorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  CreateAuthor(argument: _author_v1_CreateAuthorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  CreateAuthor(argument: _author_v1_CreateAuthorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  CreateAuthor(argument: _author_v1_CreateAuthorRequest, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  createAuthor(argument: _author_v1_CreateAuthorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  createAuthor(argument: _author_v1_CreateAuthorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  createAuthor(argument: _author_v1_CreateAuthorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  createAuthor(argument: _author_v1_CreateAuthorRequest, callback: grpc.requestCallback<_author_v1_CreateAuthorResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteAuthor(argument: _author_v1_DeleteAuthorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAuthor(argument: _author_v1_DeleteAuthorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAuthor(argument: _author_v1_DeleteAuthorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteAuthor(argument: _author_v1_DeleteAuthorRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteAuthor(argument: _author_v1_DeleteAuthorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteAuthor(argument: _author_v1_DeleteAuthorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteAuthor(argument: _author_v1_DeleteAuthorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteAuthor(argument: _author_v1_DeleteAuthorRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  GetById(argument: _author_v1_GetByIdResponse, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _author_v1_GetByIdResponse, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _author_v1_GetByIdResponse, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  GetById(argument: _author_v1_GetByIdResponse, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _author_v1_GetByIdResponse, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _author_v1_GetByIdResponse, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _author_v1_GetByIdResponse, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  getById(argument: _author_v1_GetByIdResponse, callback: grpc.requestCallback<_author_v1_GetByIdResponse__Output>): grpc.ClientUnaryCall;
  
  GetList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  GetList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  GetList(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  GetList(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  getList(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_author_v1_GetListResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateAuthor(argument: _author_v1_UpdateAuthorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  UpdateAuthor(argument: _author_v1_UpdateAuthorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  UpdateAuthor(argument: _author_v1_UpdateAuthorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  UpdateAuthor(argument: _author_v1_UpdateAuthorRequest, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  updateAuthor(argument: _author_v1_UpdateAuthorRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  updateAuthor(argument: _author_v1_UpdateAuthorRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  updateAuthor(argument: _author_v1_UpdateAuthorRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  updateAuthor(argument: _author_v1_UpdateAuthorRequest, callback: grpc.requestCallback<_author_v1_UpdateAuthorResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthorServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateAuthor: grpc.handleUnaryCall<_author_v1_CreateAuthorRequest__Output, _author_v1_CreateAuthorResponse>;
  
  DeleteAuthor: grpc.handleUnaryCall<_author_v1_DeleteAuthorRequest__Output, _google_protobuf_Empty>;
  
  GetById: grpc.handleUnaryCall<_author_v1_GetByIdResponse__Output, _author_v1_GetByIdResponse>;
  
  GetList: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _author_v1_GetListResponse>;
  
  UpdateAuthor: grpc.handleUnaryCall<_author_v1_UpdateAuthorRequest__Output, _author_v1_UpdateAuthorResponse>;
  
}

export interface AuthorServiceDefinition extends grpc.ServiceDefinition {
  CreateAuthor: MethodDefinition<_author_v1_CreateAuthorRequest, _author_v1_CreateAuthorResponse, _author_v1_CreateAuthorRequest__Output, _author_v1_CreateAuthorResponse__Output>
  DeleteAuthor: MethodDefinition<_author_v1_DeleteAuthorRequest, _google_protobuf_Empty, _author_v1_DeleteAuthorRequest__Output, _google_protobuf_Empty__Output>
  GetById: MethodDefinition<_author_v1_GetByIdResponse, _author_v1_GetByIdResponse, _author_v1_GetByIdResponse__Output, _author_v1_GetByIdResponse__Output>
  GetList: MethodDefinition<_google_protobuf_Empty, _author_v1_GetListResponse, _google_protobuf_Empty__Output, _author_v1_GetListResponse__Output>
  UpdateAuthor: MethodDefinition<_author_v1_UpdateAuthorRequest, _author_v1_UpdateAuthorResponse, _author_v1_UpdateAuthorRequest__Output, _author_v1_UpdateAuthorResponse__Output>
}

import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { BookServiceClient as _book_v1_BookServiceClient, BookServiceDefinition as _book_v1_BookServiceDefinition } from './book/v1/BookService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  book: {
    v1: {
      Book: MessageTypeDefinition
      BookService: SubtypeConstructor<typeof grpc.Client, _book_v1_BookServiceClient> & { service: _book_v1_BookServiceDefinition }
      CreateBookRequest: MessageTypeDefinition
      CreateBookResponse: MessageTypeDefinition
      DeleteBookRequest: MessageTypeDefinition
      GetByIdRequest: MessageTypeDefinition
      GetByIdResponse: MessageTypeDefinition
      GetListRequest: MessageTypeDefinition
      GetListResponse: MessageTypeDefinition
      UpdateBookRequest: MessageTypeDefinition
      UpdateBookResponse: MessageTypeDefinition
    }
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}


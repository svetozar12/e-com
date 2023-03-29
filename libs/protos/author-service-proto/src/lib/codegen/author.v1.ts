import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthorServiceClient as _author_v1_AuthorServiceClient, AuthorServiceDefinition as _author_v1_AuthorServiceDefinition } from './author/v1/AuthorService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  author: {
    v1: {
      Author: MessageTypeDefinition
      AuthorService: SubtypeConstructor<typeof grpc.Client, _author_v1_AuthorServiceClient> & { service: _author_v1_AuthorServiceDefinition }
      CreateAuthorRequest: MessageTypeDefinition
      CreateAuthorResponse: MessageTypeDefinition
      DeleteAuthorRequest: MessageTypeDefinition
      GetByIdRequest: MessageTypeDefinition
      GetByIdResponse: MessageTypeDefinition
      GetListResponse: MessageTypeDefinition
      UpdateAuthorRequest: MessageTypeDefinition
      UpdateAuthorResponse: MessageTypeDefinition
    }
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}


// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace BookServiceTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: { input: string; output: string; }
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  UserService_GetUser?: Maybe<User>;
  UserService_connectivityState?: Maybe<ConnectivityState>;
  AuthenticationService_connectivityState?: Maybe<ConnectivityState>;
};


export type QueryUserService_GetUserArgs = {
  input?: InputMaybe<GetUserRequest_Input>;
};


export type QueryUserService_connectivityStateArgs = {
  tryToConnect?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAuthenticationService_connectivityStateArgs = {
  tryToConnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  email?: Maybe<Scalars['String']['output']>;
};

/** User Service */
export type GetUserRequest_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type ConnectivityState =
  | 'IDLE'
  | 'CONNECTING'
  | 'READY'
  | 'TRANSIENT_FAILURE'
  | 'SHUTDOWN';

export type Mutation = {
  UserService_Register?: Maybe<RegisterResponse>;
  UserService_UpdateUser?: Maybe<User>;
  UserService_DeleteUser?: Maybe<User>;
  AuthenticationService_Login?: Maybe<LoginResponse>;
  AuthenticationService_VerifyToken?: Maybe<VerifyTokenResponse>;
};


export type MutationUserService_RegisterArgs = {
  input?: InputMaybe<RegisterRequest_Input>;
};


export type MutationUserService_UpdateUserArgs = {
  input?: InputMaybe<UpdateUserRequest_Input>;
};


export type MutationUserService_DeleteUserArgs = {
  input?: InputMaybe<DeleteUserRequest_Input>;
};


export type MutationAuthenticationService_LoginArgs = {
  input?: InputMaybe<LoginRequest_Input>;
};


export type MutationAuthenticationService_VerifyTokenArgs = {
  input?: InputMaybe<VerifyTokenRequest_Input>;
};

export type RegisterResponse = {
  token?: Maybe<Scalars['String']['output']>;
};

export type RegisterRequest_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserRequest_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteUserRequest_Input = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponse = {
  token?: Maybe<Scalars['String']['output']>;
};

/** Authentication Service */
export type LoginRequest_Input = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyTokenResponse = {
  isValid?: Maybe<Scalars['Boolean']['output']>;
};

export type VerifyTokenRequest_Input = {
  token?: InputMaybe<Scalars['String']['input']>;
};

  export type QuerySdk = {
      /** null **/
  UserService_GetUser: InContextSdkMethod<Query['UserService_GetUser'], QueryUserService_GetUserArgs, MeshContext>,
  /** undefined **/
  UserService_connectivityState: InContextSdkMethod<Query['UserService_connectivityState'], QueryUserService_connectivityStateArgs, MeshContext>,
  /** undefined **/
  AuthenticationService_connectivityState: InContextSdkMethod<Query['AuthenticationService_connectivityState'], QueryAuthenticationService_connectivityStateArgs, MeshContext>
  };

  export type MutationSdk = {
      /** null **/
  UserService_Register: InContextSdkMethod<Mutation['UserService_Register'], MutationUserService_RegisterArgs, MeshContext>,
  /** null **/
  UserService_UpdateUser: InContextSdkMethod<Mutation['UserService_UpdateUser'], MutationUserService_UpdateUserArgs, MeshContext>,
  /** null **/
  UserService_DeleteUser: InContextSdkMethod<Mutation['UserService_DeleteUser'], MutationUserService_DeleteUserArgs, MeshContext>,
  /** null **/
  AuthenticationService_Login: InContextSdkMethod<Mutation['AuthenticationService_Login'], MutationAuthenticationService_LoginArgs, MeshContext>,
  /** null **/
  AuthenticationService_VerifyToken: InContextSdkMethod<Mutation['AuthenticationService_VerifyToken'], MutationAuthenticationService_VerifyTokenArgs, MeshContext>
  };

  export type SubscriptionSdk = {
    
  };

  export type Context = {
      ["BookService"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}

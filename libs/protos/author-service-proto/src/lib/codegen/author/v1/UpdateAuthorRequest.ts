// Original file: lib/author.v1.proto

import type { Author as _author_v1_Author, Author__Output as _author_v1_Author__Output } from '../../author/v1/Author';

export interface UpdateAuthorRequest {
  '_id'?: (string);
  'author'?: (_author_v1_Author | null);
}

export interface UpdateAuthorRequest__Output {
  '_id'?: (string);
  'author'?: (_author_v1_Author__Output);
}

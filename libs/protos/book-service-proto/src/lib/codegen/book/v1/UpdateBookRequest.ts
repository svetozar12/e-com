// Original file: lib/book.v1.proto

import type { Book as _book_v1_Book, Book__Output as _book_v1_Book__Output } from '../../book/v1/Book';

export interface UpdateBookRequest {
  '_id'?: (string);
  'book'?: (_book_v1_Book | null);
}

export interface UpdateBookRequest__Output {
  '_id'?: (string);
  'book'?: (_book_v1_Book__Output);
}

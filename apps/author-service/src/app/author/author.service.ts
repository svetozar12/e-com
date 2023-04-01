import { Injectable } from '@nestjs/common';
import { Authors } from '@ms-learning/mongo-models';
import {
  Author,
  CreateAuthorRequest,
  CreateAuthorResponse,
  DeleteAuthorRequest,
  Empty,
  GetByIdResponse,
  UpdateAuthorRequest,
  UpdateAuthorResponse,
} from '@ms-learning/author-service-proto';
@Injectable()
export class AuthorService {
  async getById({ _id }: Author): Promise<GetByIdResponse> {
    console.log(_id);

    const author = await Authors.findById(_id).exec();
    return { author };
  }
  async getList(): Promise<{ authors: Author[] }> {
    const authors = await Authors.find().exec();
    return { authors };
  }
  async createAuthor(args: CreateAuthorRequest): Promise<CreateAuthorResponse> {
    const author = await Authors.create(args);
    author.save();
    return { author };
  }
  async updateAuthor({
    author,
  }: UpdateAuthorRequest): Promise<UpdateAuthorResponse> {
    const newAuthor = await Authors.findOneAndUpdate(author).exec();
    return { author: newAuthor };
  }
  async deleteBook({ _id }: DeleteAuthorRequest): Promise<Empty> {
    await Authors.deleteOne({ _id }).exec();
    return {};
  }
}

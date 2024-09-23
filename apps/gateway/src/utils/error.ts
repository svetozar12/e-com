import { AxiosError } from 'axios';
import { GraphQLError } from 'graphql';

export function formatError(err: unknown) {
  console.log(err);
  if (err instanceof AxiosError) {
    return Promise.reject(new GraphQLError(err.response.data.message));
  }
  return Promise.reject(err);
}

import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { QueryResolvers } from './../../codegen/types.generated';
export const searchProduct: NonNullable<
  QueryResolvers['searchProduct']
> = async (_parent, { searchText }, { token }) =>
  sdk.search().searchProducts(searchText, token).catch(formatError);

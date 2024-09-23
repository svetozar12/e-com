import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { QueryResolvers } from './../../codegen/types.generated';
export const products: NonNullable<QueryResolvers['products']> = async (
  _parent,
  { pagination: { limit, page, sortBy } }
) => sdk.product().getProducts({ limit, page, sortBy }).catch(formatError);

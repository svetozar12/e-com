import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { QueryResolvers } from './../../codegen/types.generated';
export const productById: NonNullable<QueryResolvers['productById']> = async (
  _parent,
  { id, category }
) => sdk.product().getProductById({ id, category }).catch(formatError);

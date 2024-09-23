import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { QueryResolvers } from './../../codegen/types.generated';
export const cart: NonNullable<QueryResolvers['cart']> = async () =>
  sdk.cart().getCart().catch(formatError);

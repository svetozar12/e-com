import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from './../../codegen/types.generated';
export const cartUpdate: NonNullable<MutationResolvers['cartUpdate']> = async (
  _parent,
  { products, deleteProducts }
) => {
  if (products) {
    return sdk.cart().updateCart({ products }).catch(formatError);
  } else {
    return sdk.cart().updateCart({ deleteProducts }).catch(formatError);
  }
};

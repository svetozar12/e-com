import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from '../../codegen/types.generated';
export const updateCart: NonNullable<MutationResolvers['updateCart']> = async (
  _parent,
  { products, deleteProducts },
  { token }
) => {
  if (products) {
    return sdk.cart().updateCart({ products }, token).catch(formatError);
  } else {
    return sdk.cart().updateCart({ deleteProducts }, token).catch(formatError);
  }
};

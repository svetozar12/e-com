import { formatError } from '../../utils/error';
import { sdk } from '../../utils/sdk';
import type { MutationResolvers } from './../../codegen/types.generated';
export const updateProduct: NonNullable<MutationResolvers['updateProduct']> = async (_parent, { id, product }) =>
  sdk.product().updateProduct(id, product).catch(formatError);
